import { describe, expect, it } from 'vitest'
import { normalizeAlias, validateAlias } from '~/utils/alias'

describe('alias validation', () => {
  it('trims aliases before validating or saving them', () => {
    expect(normalizeAlias('  Vecino  ')).toBe('Vecino')
  })

  it.each([
    ['', 'El alias es obligatorio.'],
    ['ab', 'El alias debe tener al menos 3 caracteres.'],
    ['a'.repeat(21), 'El alias no puede superar los 20 caracteres.'],
    ['AdMiN', 'Este alias no está disponible.'],
  ])('rejects invalid aliases', (alias, message) => {
    expect(validateAlias(alias)).toBe(message)
  })

  it('accepts a valid alias', () => {
    expect(validateAlias('Vecino 12')).toBeNull()
  })
})
