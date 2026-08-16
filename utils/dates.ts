import type { Season, Settings, Slot } from '~/types/models'

const TIME_ZONE = 'Europe/Madrid'

function madridParts(date: Date): Record<string, string> {
  return Object.fromEntries(new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE,
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(date).filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]))
}

function addDays(date: string, days: number): string {
  const value = new Date(`${date}T12:00:00Z`)
  value.setUTCDate(value.getUTCDate() + days)
  return value.toISOString().slice(0, 10)
}

function madridDateTime(date: string, time: string): Date {
  const [year, month, day] = date.split('-').map(Number)
  const [hour, minute] = time.split(':').map(Number)
  const target = Date.UTC(year, month - 1, day, hour, minute)
  let candidate = new Date(target)

  for (let attempt = 0; attempt < 2; attempt++) {
    const parts = madridParts(candidate)
    const represented = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour),
      Number(parts.minute),
    )
    candidate = new Date(candidate.getTime() + target - represented)
  }

  return candidate
}

export function getSeason(date: string, settings: Settings): Season {
  return date >= settings.summerStart && date <= settings.summerEnd ? 'summer' : 'winter'
}

export function getFirstBookableDate(settings: Settings, now = new Date()): string {
  const parts = madridParts(now)
  const currentDate = `${parts.year}-${parts.month}-${parts.day}`
  const rollover = getSeason(currentDate, settings) === 'summer' ? '23:01' : '22:01'
  return `${parts.hour}:${parts.minute}` >= rollover ? addDays(currentDate, 1) : currentDate
}

export function getVisibleDates(settings: Settings, now = new Date()): string[] {
  const firstDate = getFirstBookableDate(settings, now)
  return Array.from({ length: 7 }, (_, index) => addDays(firstDate, index))
}

export function isSlotExpired(date: string, endTime: string, now = new Date()): boolean {
  const expiration = madridDateTime(date, endTime)
  expiration.setMinutes(expiration.getMinutes() + 1)
  return now.getTime() >= expiration.getTime()
}

export function getNextTemporalEvent(settings: Settings, slots: Slot[], now = new Date()): Date {
  const parts = madridParts(now)
  const currentDate = `${parts.year}-${parts.month}-${parts.day}`
  const dates = [currentDate, addDays(currentDate, 1)]
  const candidates = dates.flatMap((date) => {
    const rollover = getSeason(date, settings) === 'summer' ? '23:01' : '22:01'
    return [
      madridDateTime(date, rollover),
      ...slots.map((slot) => {
        const expiration = madridDateTime(date, slot.endTime)
        expiration.setMinutes(expiration.getMinutes() + 1)
        return expiration
      }),
    ]
  })

  return candidates
    .filter((candidate) => candidate.getTime() > now.getTime())
    .sort((left, right) => left.getTime() - right.getTime())[0]!
}

export function formatDate(date: string, options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }): string {
  return new Intl.DateTimeFormat('es-ES', { ...options, timeZone: TIME_ZONE }).format(new Date(`${date}T12:00:00Z`))
}

export function formatTime(time: string): string {
  return time.slice(0, 5)
}
