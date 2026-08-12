# CLAUDE.md

## Proyecto

Jardines de Hércules II - Pista de Pádel

---

## Instrucción Principal

Antes de realizar cualquier tarea debes leer:

- AGENTS.md
- Toda la documentación de /docs
- Todos los diseños de /docs/design

No generes código hasta comprender completamente las reglas de negocio.

---

## Prioridades

1. Cumplir reglas de negocio.
2. Respetar la documentación.
3. Respetar los diseños.
4. Mantener simplicidad.
5. Mantener código limpio.

---

## Stack Obligatorio

- Nuxt 3
- Vue 3
- TypeScript
- Pinia
- Supabase
- Supabase Realtime

---

## Nunca Implementar

- Registro público
- Cambio de contraseña
- Recuperación automática de contraseña
- Panel de administración
- Chat
- Estadísticas
- Incidencias
- Sanciones
- Reservas recurrentes
- Lista de espera

---

## Reservas

Respetar siempre:

- Máximo 3 reservas activas.
- Máximo 1 reserva por día.
- Horario no repetido.
- Control de concurrencia.
- Reserva inmediata al pulsar slot libre.
- Modal de cancelación para reservas propias.

---

## Usuario Deshabilitado

Si:

profiles.active = false

Entonces:

- Cerrar sesión.
- Redirigir a Login.
- Mostrar mensaje informativo.

---

## Mobile First

Toda decisión de UI debe priorizar dispositivos móviles.

---

## Regla Final

Si existen varias soluciones válidas:

Elegir siempre la más simple.
