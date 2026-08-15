import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

interface TestUser {
  id: string
  email: string
}

interface TestSlot {
  id: number
  season: string
}

const environment = Object.fromEntries(
  readFileSync('.env.test', 'utf8')
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      const separator = line.indexOf('=')
      return [line.slice(0, separator), line.slice(separator + 1)]
    }),
)
const supabaseUrl = environment.SUPABASE_URL
const anonKey = environment.SUPABASE_KEY
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const options = { auth: { autoRefreshToken: false, persistSession: false } }
const runId = Date.now().toString().slice(-10)
const users: TestUser[] = []
const createdSlotIds: number[] = []
let createdSettingsId: number | null = null
let admin: SupabaseClient
let first: SupabaseClient
let second: SupabaseClient
let anonymous: SupabaseClient
let summerSlot: TestSlot
let winterSlot: TestSlot
let today: string

function getMadridDate(): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Madrid',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date())
  const part = (type: string) => parts.find((value) => value.type === type)?.value
  return `${part('year')}-${part('month')}-${part('day')}`
}

async function createTestUser(label: string): Promise<TestUser> {
  const email = `integration-${runId}-${label}@example.test`
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password: 'IntegrationPass123!',
    email_confirm: true,
  })
  if (error || !data.user) throw error ?? new Error('No se pudo crear el usuario temporal.')
  return { id: data.user.id, email }
}

async function login(email: string): Promise<SupabaseClient> {
  const client = createClient(supabaseUrl, anonKey, options)
  const { error } = await client.auth.signInWithPassword({ email, password: 'IntegrationPass123!' })
  if (error) throw error
  return client
}

describe.sequential('Supabase local: RPC, RLS y concurrencia', () => {
  beforeAll(async () => {
    if (!supabaseUrl || !anonKey || !serviceRoleKey) throw new Error('Falta la configuración local de integración.')

    admin = createClient(supabaseUrl, serviceRoleKey, options)
    anonymous = createClient(supabaseUrl, anonKey, options)
    today = getMadridDate()
    users.push(await createTestUser('one'), await createTestUser('two'))

    const { data: settings, error: settingsError } = await admin.from('settings').select('id').limit(1)
    if (settingsError) throw settingsError
    if (!settings.length) {
      const year = today.slice(0, 4)
      const { data, error } = await admin.from('settings').insert({
        id: 1,
        summer_start: `${year}-01-01`,
        summer_end: `${year}-12-31`,
      }).select('id').single()
      if (error) throw error
      createdSettingsId = data.id
    }

    const { data: existingSlots, error: slotsError } = await admin.from('slots').select('id,season')
    if (slotsError) throw slotsError
    const slots = [...existingSlots] as TestSlot[]
    for (const season of ['summer', 'winter']) {
      if (!slots.some((slot) => slot.season === season)) {
        const { data, error } = await admin.from('slots').insert({
          season,
          start_time: '10:00',
          end_time: '11:30',
        }).select('id,season').single()
        if (error) throw error
        slots.push(data as TestSlot)
        createdSlotIds.push(data.id)
      }
    }
    summerSlot = slots.find((slot) => slot.season === 'summer')!
    winterSlot = slots.find((slot) => slot.season === 'winter')!

    const profiles = users.map((user, index) => ({
      id: user.id,
      alias: `T${runId}${index}`,
      staircase: 'T',
      floor: '1',
      door: String(index + 1),
      active: true,
    }))
    const { error: profilesError } = await admin.from('profiles').insert(profiles)
    if (profilesError) throw profilesError
    first = await login(users[0].email)
    second = await login(users[1].email)
  })

  afterAll(async () => {
    for (const user of users) await admin.auth.admin.deleteUser(user.id)
    if (createdSlotIds.length) await admin.from('slots').delete().in('id', createdSlotIds)
    if (createdSettingsId !== null) await admin.from('settings').delete().eq('id', createdSettingsId)
  })

  it('denies anonymous access to the booking RPC', async () => {
    const { error } = await anonymous.rpc('create_booking', { p_booking_date: today, p_slot_id: summerSlot.id })
    expect(error?.code).toBe('42501')
  })

  it('enforces RLS for direct bookings, protected profile fields and foreign profiles', async () => {
    const { error: bookingError } = await first.from('bookings').insert({
      user_id: users[0].id,
      booking_date: today,
      slot_id: summerSlot.id,
      status: 'active',
    })
    expect(bookingError).not.toBeNull()

    const { error: profileError } = await first.from('profiles').update({ active: false }).eq('id', users[0].id)
    expect(profileError).not.toBeNull()

    const { data: foreignProfile, error: foreignError } = await first.from('profiles').select('id').eq('id', users[1].id)
    expect(foreignError).toBeNull()
    expect(foreignProfile).toEqual([])
  })

  it('rejects an incompatible season and protects cancellation ownership', async () => {
    const { error: seasonError } = await first.rpc('create_booking', { p_booking_date: today, p_slot_id: winterSlot.id })
    expect(seasonError).not.toBeNull()

    const { data: bookingId, error: bookingError } = await first.rpc('create_booking', { p_booking_date: today, p_slot_id: summerSlot.id })
    expect(bookingError).toBeNull()

    const { error: foreignCancelError } = await second.rpc('cancel_booking', { p_booking_id: bookingId })
    expect(foreignCancelError).not.toBeNull()

    const { error: cancelError } = await first.rpc('cancel_booking', { p_booking_id: bookingId })
    expect(cancelError).toBeNull()
  })

  it('frees cancelled slots and allows only one concurrent booking', async () => {
    const { data: bookingId, error: createError } = await second.rpc('create_booking', { p_booking_date: today, p_slot_id: summerSlot.id })
    expect(createError).toBeNull()
    const { error: cancelError } = await second.rpc('cancel_booking', { p_booking_id: bookingId })
    expect(cancelError).toBeNull()

    const attempts = await Promise.all([
      first.rpc('create_booking', { p_booking_date: today, p_slot_id: summerSlot.id }),
      second.rpc('create_booking', { p_booking_date: today, p_slot_id: summerSlot.id }),
    ])
    const successfulAttempt = attempts.find((attempt) => !attempt.error)
    expect(attempts.filter((attempt) => !attempt.error)).toHaveLength(1)
    const owner = successfulAttempt === attempts[0] ? first : second
    const { error } = await owner.rpc('cancel_booking', { p_booking_id: successfulAttempt?.data })
    expect(error).toBeNull()
  })
})
