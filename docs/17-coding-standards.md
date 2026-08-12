# 17 - Coding Standards

## Objetivo

Este documento define los estándares de desarrollo que deberán seguirse durante la implementación de la aplicación Jardines de Hércules II - Pista de Pádel.

Su objetivo es garantizar consistencia, legibilidad y mantenibilidad del código.

---

# Principios Generales

## Simplicidad

Siempre se elegirá la solución más simple que cumpla los requisitos funcionales.

Evitar:

- Sobreingeniería.
- Patrones innecesarios.
- Abstracciones prematuras.

---

## Legibilidad

El código debe ser fácil de leer y entender por cualquier desarrollador.

Priorizar:

```text
Código claro > Código inteligente
```

---

## Consistencia

Todo el proyecto debe seguir las mismas convenciones.

---

# Lenguaje

## Obligatorio

```text
TypeScript
```

---

## Prohibido

```ts
any
```

salvo situaciones excepcionales justificadas.

---

# Nomenclatura

## Variables

Utilizar:

```ts
camelCase
```

Ejemplo:

```ts
userProfile
bookingDate
activeReservations
```

---

## Funciones

Utilizar:

```ts
camelCase
```

Ejemplo:

```ts
createBooking()
cancelBooking()
loadNotifications()
```

---

## Componentes Vue

Utilizar:

```text
PascalCase
```

Ejemplo:

```text
ReservationCalendar.vue
SideMenu.vue
NotificationList.vue
```

---

## Interfaces

Utilizar:

```ts
PascalCase
```

Ejemplo:

```ts
Profile
Booking
Notification
```

---

## Constantes

Utilizar:

```ts
UPPER_SNAKE_CASE
```

Ejemplo:

```ts
MAX_ACTIVE_BOOKINGS
RESERVED_ALIASES
```

---

# Estructura de Componentes

Orden recomendado:

```ts
<script setup>

imports

types

props

stores

composables

state

computed

methods

watchers

lifecycle

</script>

<template>
</template>

<style>
</style>
```

---

# Funciones

## Responsabilidad Única

Cada función debe hacer una única cosa.

---

## Tamaño

Evitar funciones excesivamente largas.

Objetivo:

```text
Menos de 50 líneas
```

cuando sea posible.

---

# Comentarios

## Regla

Comentar únicamente cuando aporte valor.

---

## Evitar

```ts
// Incrementa contador
counter++
```

---

## Permitido

Explicaciones de reglas de negocio complejas.

---

# Imports

## Orden

```ts
1. Vue
2. Nuxt
3. Librerías externas
4. Stores
5. Composables
6. Tipos
7. Componentes
```

---

# Tipos

## Preferencia

Utilizar:

```ts
interface
```

para modelos de negocio.

---

Ejemplo:

```ts
interface Booking {
  id: string
  bookingDate: string
  slotId: string
}
```

---

# Stores

## Regla

Cada store debe gestionar una única responsabilidad.

---

Ejemplos

```text
authStore
profileStore
reservationsStore
notificationsStore
```

---

# Consultas Supabase

## Regla

Centralizar acceso a datos.

Preferiblemente mediante:

```text
/services
```

---

## Evitar

Consultas dispersas por múltiples componentes.

---

# Gestión de Errores

## Obligatorio

Capturar errores esperados.

Ejemplo:

```ts
try {
  ...
} catch (error) {
  ...
}
```

---

## Mensajes

Mostrar mensajes comprensibles para el usuario.

Nunca exponer:

- SQL.
- Stack traces.
- Errores internos.

---

# CSS

## Estrategia

Seguir los diseños ubicados en:

```text
/docs/design
```

---

## Objetivo

Mantener consistencia visual.

---

# Responsive

## Prioridad

```text
Mobile First
```

---

Validar:

- Android.
- iPhone.
- Tablet.
- Escritorio.

---

# Seguridad

## Nunca confiar en Frontend

Todas las reglas críticas deben validarse en backend.

Ejemplos:

- Reservas.
- Alias.
- Usuario activo.

---

# Realtime

## Uso permitido

- Bookings.
- Notifications.
- Profiles.

---

## Prohibido

- Polling.
- Presencia.
- Chats.

---

# Organización de Carpetas

```text
/pages
/components
/composables
/services
/stores
/types
/assets
/public
```

---

# Calidad

Antes de cada entrega comprobar:

- Sin errores TypeScript.
- Sin warnings críticos.
- Sin código muerto.
- Sin imports sin uso.
- Sin console.log de depuración.

---

# Regla Final

Si una implementación es más compleja de lo necesario:

```text
Elegir la opción más simple.
```
