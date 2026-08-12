# 11 - Development Rules

## Objetivo

Este documento define las normas de desarrollo que deberán seguirse durante la implementación de la aplicación Jardines de Hércules II - Pista de Pádel.

Su objetivo es garantizar consistencia, simplicidad y mantenibilidad.

---

# Principio Fundamental

Ante varias soluciones válidas:

```text
Siempre se elegirá la solución más simple.
```

---

# Filosofía del Proyecto

## Simplicidad

La aplicación está diseñada para una comunidad con aproximadamente 220 viviendas y unos 20 usuarios habituales.

No se implementarán soluciones complejas para resolver problemas poco probables.

---

## Administración Manual

Si una tarea ocurre pocas veces:

```text
Se realizará manualmente desde Supabase.
```

Antes de automatizar cualquier proceso deberá justificarse claramente su necesidad.

---

## Mobile First

Todas las decisiones de diseño y desarrollo deberán priorizar:

```text
Teléfono móvil
```

sobre escritorio.

---

# Tecnologías Obligatorias

## Frontend

- Nuxt 3
- Vue 3
- TypeScript

## Backend

- Supabase

## Base de Datos

- PostgreSQL (Supabase)

## Realtime

- Supabase Realtime

---

# Tecnologías No Permitidas

No se implementarán:

- Backend Node.js propio.
- API REST personalizada.
- Microservicios.
- GraphQL.
- Redux.
- Vuex.
- Sistemas de caché complejos.
- Librerías innecesarias.

---

# Organización del Proyecto

## Estructura recomendada

```text
/pages
/components
/composables
/services
/types
/assets
/public
```

---

# Tipado

## Regla

Todo el código deberá estar tipado mediante:

```text
TypeScript
```

Evitar:

```ts
any
```

salvo casos excepcionales.

---

# Componentes

## Reutilización

Todo elemento repetido deberá convertirse en componente reutilizable.

Ejemplos:

- Menú.
- Modal cancelar.
- Slot de reserva.
- Listados.

---

## Responsabilidad Única

Cada componente deberá tener una única responsabilidad.

---

# Base de Datos

## Consultas

Las consultas deberán ser simples y fáciles de mantener.

---

## Validaciones Críticas

Las reglas de negocio importantes deberán validarse siempre en backend.

Ejemplos:

- Máximo 3 reservas.
- Máximo 1 reserva por día.
- Horario no repetido.
- Usuario activo.

Nunca confiar exclusivamente en validaciones frontend.

---

# Seguridad

## RLS

Se utilizarán políticas RLS en Supabase.

---

## Acceso a Datos

Un usuario únicamente podrá:

- Acceder a su perfil.
- Gestionar sus reservas.

---

# Realtime

## Uso

Realtime se utilizará únicamente para:

- Reservas.
- Notificaciones.
- Estado del usuario.

---

## Prohibido

- Polling constante.
- WebSockets personalizados.
- Sistemas de presencia.

---

# Gestión de Errores

## Regla

Los errores deben mostrarse al usuario mediante mensajes claros.

Evitar mensajes técnicos.

---

## Ejemplo

Correcto:

```text
Ha alcanzado el máximo de 3 reservas activas.
```

Incorrecto:

```text
Database constraint violation.
```

---

# Rendimiento

## Prioridad

La aplicación debe sentirse rápida.

---

## Evitar

- Consultas innecesarias.
- Componentes excesivamente complejos.
- Recargas completas de página.

---

# Contenido Estático

## Normas de uso

Se almacenarán en:

```text
JSON o TypeScript
```

---

## Acerca de

Se almacenará en:

```text
JSON o TypeScript
```

---

# Mantenimiento

## Gestión

Todo el mantenimiento de la pista será manual.

No deben desarrollarse automatismos adicionales.

---

# Funcionalidades Fuera de Alcance

No se desarrollarán:

- Panel de administración.
- Recuperación automática de contraseña.
- Cambio de contraseña.
- Sistema de incidencias.
- Sistema de sanciones.
- Históricos complejos.
- Estadísticas.
- Reservas recurrentes.
- Listas de espera.
- Notificaciones push.
- Chats.
- Integraciones externas.

---

# Referencia Funcional

La implementación deberá respetar obligatoriamente:

```text
00-project-overview.md
01-business-rules.md
02-ui-ux.md
03-database.md
04-authentication.md
05-reservations.md
06-realtime.md
07-api.md
08-pages.md
09-components.md
10-testing.md
```

---

# Referencia Visual

La implementación deberá utilizar como referencia visual oficial los diseños ubicados en:

```text
/docs/design
```

Cualquier diferencia entre implementación y diseño deberá justificarse explícitamente.
