import type { Season, Settings } from '~/types/models'

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
