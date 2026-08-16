# 07 - API

## Objetivo

Este documento define las operaciones de acceso a datos utilizadas por la aplicación Jardines de Hércules II - Pista de Pádel.

La aplicación utilizará exclusivamente Supabase como backend.

No existirán APIs REST personalizadas ni servidores intermedios.

---

# Arquitectura

```text
Nuxt Application
        │
        ▼
Supabase Client
        │
        ▼
Supabase Database
```

Todas las operaciones se realizarán mediante:

- Supabase Auth
- Supabase Database
- Supabase Realtime

---

# Autenticación

## Login

### Entrada

```text
email
password
```

### Operación

```ts
supabase.auth.signInWithPassword()
```

### Resultado

- Sesión creada.
- Token gestionado por Supabase.

---

## Logout

### Operación

```ts
supabase.auth.signOut()
```

### Resultado

- Sesión eliminada.
- Redirección al Login.

---

# Profiles

## Obtener perfil actual

### Tabla

```text
profiles
```

### Filtro

```text
id = auth.user.id
```

### Uso

- Alias.
- Vivienda.
- Estado activo.

---

## Actualizar alias

### Tabla

```text
profiles
```

### Campos modificables

```text
alias
```

### Validaciones

- Obligatorio.
- Entre 3 y 20 caracteres.
- Único.
- No reservado.

---

# Settings

## Obtener configuración

### Tabla

```text
settings
```

### Uso

Determinar:

- Inicio verano.
- Fin verano.

---

# Slots

## Obtener slots de temporada

### Tabla

```text
slots
```

### Filtro

```text
season = summer
```

o

```text
season = winter
```

### Uso

Construcción del calendario.

---

# Bookings

## Obtener reservas visibles

### Tabla

```text
bookings
```

### Filtros

```text
status = active
```

y

```text
booking_date
```

dentro de los 7 días visibles.

### Uso

Pantalla Reservas.

---

## Obtener mis reservas

### Tabla

```text
bookings
```

### Filtros

```text
user_id = usuario actual
status = active
```

### Orden

```text
booking_date ASC
```

---

## Crear reserva

### Operación

Llamada a la función RPC de Supabase:

```ts
supabase.rpc('create_booking', {
  p_slot_id: slotId,
  p_booking_date: bookingDate,
})
```

### Validaciones Backend (RPC)

- Usuario activo.
- Máximo 3 reservas activas.
- Máximo 1 reserva por día.
- Horario (`slot_id`) no repetido.
- Fecha dentro de la ventana reservable y conforme al rollover de `Europe/Madrid`.
- Franja no expirada: hora actual anterior a `end_time + 1 minuto`.
- Las reservas `active` ya expiradas se ignoran en los límites y validaciones.

## Completar reservas expiradas

```ts
supabase.rpc('complete_expired_bookings')
```

Cambia a `completed` las reservas `active` que hayan alcanzado
`slots.end_time + 1 minuto` en `Europe/Madrid`. Requiere autenticación.
- Slot correspondiente a la temporada de la fecha solicitada.
- Slot libre.

---

## Cancelar reserva

### Operación

Llamada a la función RPC de Supabase:

```ts
supabase.rpc('cancel_booking', {
  p_booking_id: bookingId,
})
```

### Validaciones Backend (RPC)

- La reserva existe.
- La reserva pertenece al usuario autenticado.
- La reserva tiene estado `active`.

### Resultado

- Reserva cancelada.
- Notificación insertada directamente por la app.

---

# Notifications

## Obtener notificaciones

### Tabla

```text
notifications
```

### Filtros

```text
event_date
```

dentro de los 7 días visibles en el calendario.

### Orden

```text
created_at DESC
```

### Uso

Pantalla principal.

---

## Crear notificación

Insertada directamente por la aplicación tras realizar o cancelar una reserva.

```ts
supabase.from('notifications').insert({
  message: '...',
  event_date: 'YYYY-MM-DD',
})
```

---

# Realtime

## Suscripciones

La aplicación escuchará cambios en:

```text
bookings
notifications
profiles
```

---

# Seguridad

## Profiles

Cada usuario solo podrá acceder a:

```text
Su propio perfil
```

---

## Bookings

Cada usuario podrá:

```text
Leer reservas visibles
Crear reservas vía RPC create_booking
Cancelar reservas propias vía RPC cancel_booking
```

No podrá insertar, modificar ni eliminar reservas directamente.

---

## Notifications

Todos los usuarios autenticados podrán:

```text
Leer notificaciones (SELECT)
Crear notificaciones (INSERT)
```

No podrán modificar ni eliminar notificaciones existentes.

---

# Operaciones Administrativas

No se exponen mediante la aplicación.

Se realizan directamente desde Supabase.

Ejemplos:

- Alta de usuarios.
- Baja de usuarios.
- Desactivación de usuarios.
- Mantenimiento (asociado al usuario técnico permanente "AdminJdH").
- Creación manual de notificaciones.

---

# Funcionalidades Excluidas

No existirán:

- API REST propia.
- Backend Node.js.
- Endpoints personalizados.
- Microservicios.
- GraphQL.
- Integraciones externas.
