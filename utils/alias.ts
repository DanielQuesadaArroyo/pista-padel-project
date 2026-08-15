export const RESERVED_ALIASES = new Set(['admin', 'administrador', 'presidente', 'system', 'sistema'])

export function normalizeAlias(alias: string): string {
  return alias.trim()
}

export function validateAlias(alias: string): string | null {
  const value = normalizeAlias(alias)

  if (!value) return 'El alias es obligatorio.'
  if (value.length < 3) return 'El alias debe tener al menos 3 caracteres.'
  if (value.length > 20) return 'El alias no puede superar los 20 caracteres.'
  if (RESERVED_ALIASES.has(value.toLowerCase())) return 'Este alias no está disponible.'

  return null
}
