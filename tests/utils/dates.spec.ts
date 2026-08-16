import { describe, expect, it } from 'vitest'
import type { Settings, Slot } from '~/types/models'
import { formatTime, getFirstBookableDate, getNextTemporalEvent, getSeason, getVisibleDates, isSlotExpired } from '~/utils/dates'

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

  it('expires a Madrid slot at end_time plus one minute', () => {
    expect(isSlotExpired('2026-07-20', '14:30:00', new Date('2026-07-20T12:30:59Z'))).toBe(false)
    expect(isSlotExpired('2026-07-20', '14:30:00', new Date('2026-07-20T12:31:00Z'))).toBe(true)
    expect(isSlotExpired('2026-07-21', '14:30:00', new Date('2026-07-20T21:00:00Z'))).toBe(false)
  })

  it('schedules the next slot expiration without polling', () => {
    const slots: Slot[] = [{ id: 1, season: 'summer', startTime: '13:00:00', endTime: '14:30:00', createdAt: '' }]
    expect(getNextTemporalEvent(settings, slots, new Date('2026-07-20T12:00:00Z')).toISOString()).toBe('2026-07-20T12:31:00.000Z')
  })
})
