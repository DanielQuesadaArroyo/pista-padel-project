# 03 - Database

## Objetivo

Este documento define la estructura de base de datos de la aplicación Jardines de Hércules II - Pista de Pádel.

La base de datos se implementará en Supabase PostgreSQL.

---

# Esquema General

## Tablas

```text
profiles
settings
slots
bookings
notifications
```

Además se utilizará:

```text
auth.users
```

gestionada por Supabase Authentication.

---

# Tabla: profiles

Información pública y operativa de cada usuario.

## Campos

| Campo | Tipo | Nulo | Descripción |
|---------|---------|---------|---------|
| id | uuid | No | FK a auth.users.id |
| alias | varchar(20) | No | Alias visible |
| staircase | varchar(10) | No | Escalera |
| floor | varchar(10) | No | Planta |
| door | varchar(10) | No | Puerta |
| active | boolean | No | Usuario activo |
| created_at | timestamptz | No | Fecha creación |
| updated_at | timestamptz | No | Fecha actualización |

## Restricciones

### Alias único

```sql
UNIQUE(alias)
```

Comparación case-insensitive.

### Vivienda única

```sql
UNIQUE(staircase, floor, door)
```

Solo puede existir un usuario por vivienda.

---

# Tabla: settings

Configuración global de la aplicación.

## Campos

| Campo | Tipo |
|---------|---------|
| id | integer |
| summer_start | date |
| summer_end | date |
| created_at | timestamptz |
| updated_at | timestamptz |

## Uso

Permite determinar:

- Temporada de verano.
- Temporada de invierno.

La selección de slots se realizará mediante código.

---

# Tabla: slots

Define los horarios disponibles.

## Campos

| Campo | Tipo |
|---------|---------|
| id | bigint |
| season | varchar(20) |
| start_time | time |
| end_time | time |
| created_at | timestamptz |

## Valores season

```text
summer
winter
```

## Ejemplo invierno

```text
10:00 - 11:30
11:30 - 13:00
13:00 - 14:30
17:00 - 18:00
18:00 - 19:00
19:00 - 20:30
20:30 - 22:00
```

## Ejemplo verano

```text
10:00 - 11:30
11:30 - 13:00
13:00 - 14:30
18:00 - 19:00
19:00 - 20:00
20:00 - 21:30
21:30 - 23:00
```

---

# Tabla: bookings

Reservas de pista.

## Campos

| Campo | Tipo | Nulo | Descripción |
|---------|---------|---------|---------|
| id | uuid | No | ID de la reserva |
| user_id | uuid | No | FK a profiles.id |
| booking_date | date | No | Fecha reservada |
| slot_id | bigint | No | FK a slots.id |
| status | varchar(30) | No | Estado de la reserva |
| cancelled_by_admin | boolean | Sí | Cancelación por admin |
| created_at | timestamptz | No | Fecha creación |
| updated_at | timestamptz | No | Fecha actualización |

## Estados

```text
active
cancelled_by_user
cancelled_by_admin
maintenance
```

## Relaciones

```text
user_id -> profiles.id
slot_id -> slots.id
```

## Restricciones y Función RPC `create_booking`

### Reserva única por slot

```sql
UNIQUE(booking_date, slot_id)
```

Evita reservas duplicadas para una misma franja.

### Creación de reservas vía RPC

La creación de reservas no se realiza por `INSERT` directo desde la aplicación, sino mediante la función RPC `create_booking(p_slot_id, p_booking_date)` que valida atómicamente en backend:
- Usuario activo (`profiles.active = true`).
- Máximo 3 reservas activas por usuario.
- Máximo 1 reserva por día por usuario.
- Horario no repetido (`slot_id` no repetido entre reservas activas).
- Disponibilidad del slot.

### Mantenimiento y Usuario Técnico

`user_id` es siempre `NOT NULL`. Para las reservas de estado `maintenance` u operaciones técnicas del administrador hechas en Supabase, se asociará el ID de un usuario técnico permanente con alias `"Sistema"`.

---

# Tabla: notifications

Notificaciones visibles para todos los vecinos.

## Campos

| Campo | Tipo | Nulo | Descripción |
|---------|---------|---------|---------|
| id | uuid | No | ID de notificación |
| message | text | No | Texto descriptivo |
| event_date | date | No | Fecha asociada del evento |
| created_at | timestamptz | No | Fecha creación |

## Características y Permisos RLS

- No existen estados leído/no leído.
- No existen notificaciones por usuario (son públicas).
- Los usuarios autenticados pueden consultar (`SELECT`) e insertar (`INSERT`) notificaciones directamente desde la aplicación tras crear/cancelar una reserva.
- El filtrado de notificaciones visibles en el calendario se realiza utilizando `event_date` coincidiendo con la ventana de 7 días visibles.

---

# Auditoría

Todas las tablas principales incluirán:

```text
created_at
updated_at
```

Gestionados automáticamente por base de datos.

---

# Relaciones

```text
auth.users
    │
    ▼
profiles
    │
    ▼
bookings
    │
    ├────► slots
    │
    └────► notifications (asociadas mediante event_date y creadas tras reservas)
```

---

# Decisiones de Diseño

## Simplicidad

Se prioriza una estructura sencilla y fácilmente mantenible.

## Administración Manual

Las tareas poco frecuentes se realizarán directamente desde Supabase.

Ejemplos:

- Altas de usuarios.
- Bajas de usuarios.
- Desactivación de usuarios.
- Mantenimiento (asignando el usuario técnico "Sistema").
- Creación de notificaciones manuales.

## Sin histórico complejo

No existen tablas específicas para:

- Histórico de reservas.
- Logs funcionales.
- Incidencias.
- Sanciones.

La aplicación utilizará únicamente las tablas necesarias para su funcionamiento.
