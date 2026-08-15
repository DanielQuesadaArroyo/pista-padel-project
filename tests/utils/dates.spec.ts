import { describe, expect, it } from 'vitest'
import type { Settings } from '~/types/models'
import { formatTime, getFirstBookableDate, getSeason, getVisibleDates } from '~/utils/dates'

const settings: Settings = {
  id: 1,
  summerStart: '2026-06-15',
  summerEnd: '2026-09-15',
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
}

describe('date utilities', () => {
  it('determines the season from the configured dates', () => {
    expect(getSeason('2026-06-14', settings)).toBe('winter')
    expect(getSeason('2026-06-15', settings)).toBe('summer')
    expect(getSeason('2026-09-15', settings)).toBe('summer')
    expect(getSeason('2026-09-16', settings)).toBe('winter')
  })

  it('applies the winter rollover at 22:01 in Madrid', () => {
    expect(getFirstBookableDate(settings, new Date('2026-01-20T21:00:00Z'))).toBe('2026-01-20')
    expect(getFirstBookableDate(settings, new Date('2026-01-20T21:01:00Z'))).toBe('2026-01-21')
  })

  it('applies the summer rollover at 23:01 in Madrid', () => {
    expect(getFirstBookableDate(settings, new Date('2026-07-20T21:00:00Z'))).toBe('2026-07-20')
    expect(getFirstBookableDate(settings, new Date('2026-07-20T21:01:00Z'))).toBe('2026-07-21')
  })

  it('returns seven consecutive visible dates', () => {
    expect(getVisibleDates(settings, new Date('2026-01-20T21:01:00Z'))).toEqual([
      '2026-01-21', '2026-01-22', '2026-01-23', '2026-01-24',
      '2026-01-25', '2026-01-26', '2026-01-27',
    ])
  })

  it('formats database time values without seconds', () => {
    expect(formatTime('19:30:00')).toBe('19:30')
  })
})
