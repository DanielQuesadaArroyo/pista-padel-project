# Jardines de hercules Pista Padel

## 03 - Database Design

**Versión:** 1.0

Este documento define el diseño completo de la base de datos de "Jardines de hercules Pista Padel".

La base de datos será PostgreSQL gestionada mediante Supabase.

La base de datos representa la única fuente de verdad del sistema.

Toda la lógica crítica deberá validarse desde el backend.

---

# 1. Principios

- Evitar datos duplicados.
- Mantener la integridad.
- Minimizar inconsistencias.
- Facilitar futuras ampliaciones.
- Simplificar las consultas.

---

# 2. Modelo de datos

Entidades:

- profiles
- bookings
- time_slots
- blocked_days
- notifications
- rules
- settings
- access_requests

---

# 3. Tabla profiles

| Campo      | Tipo      | Descripción                      |
| ---------- | --------- | -------------------------------- |
| id         | UUID      | PK                               |
| email      | TEXT      | Login                            |
| alias      | TEXT      | Visible en la aplicación         |
| staircase  | INTEGER   | Escalera                         |
| floor      | INTEGER   | Planta                           |
| door       | TEXT      | Puerta                           |
| status     | TEXT      | active / disabled                |
| is_admin   | BOOLEAN   | Identificación del administrador |
| created_at | TIMESTAMP | Alta                             |

Restricciones:

```sql
UNIQUE(alias);
UNIQUE(staircase, floor, door);
```

---

# 4. Tabla time_slots

| Campo         | Tipo    |
| ------------- | ------- |
| id            | UUID    |
| season        | TEXT    |
| start_time    | TIME    |
| end_time      | TIME    |
| display_order | INTEGER |

Las reservas referencian siempre un `slot_id`.

---

# 5. Tabla bookings

| Campo        | Tipo      |
| ------------ | --------- |
| id           | UUID      |
| user_id      | UUID      |
| slot_id      | UUID      |
| booking_date | DATE      |
| created_at   | TIMESTAMP |

Relaciones:

- profiles (1) -> bookings (N)
- time_slots (1) -> bookings (N)

Restricción:

```sql
UNIQUE(booking_date, slot_id);
```

---

# 6. Tabla blocked_days

| Campo      | Tipo      |
| ---------- | --------- |
| id         | UUID      |
| date       | DATE      |
| reason     | TEXT      |
| created_at | TIMESTAMP |

```sql
UNIQUE(date);
```

---

# 7. Tabla notifications

| Campo      | Tipo      |
| ---------- | --------- |
| id         | UUID      |
| type       | TEXT      |
| message    | TEXT      |
| created_at | TIMESTAMP |

---

# 8. Tabla rules

Único registro.

| Campo   | Tipo |
| ------- | ---- |
| id      | UUID |
| title   | TEXT |
| content | TEXT |

---

# 9. Tabla settings

Único registro.

| Campo      | Tipo |
| ---------- | ---- |
| id         | UUID |
| season     | TEXT |
| about_text | TEXT |

---

# 10. Tabla access_requests

| Campo       | Tipo      |
| ----------- | --------- |
| id          | UUID      |
| staircase   | INTEGER   |
| floor       | INTEGER   |
| door        | TEXT      |
| status      | TEXT      |
| reviewed_at | TIMESTAMP |
| created_at  | TIMESTAMP |

---

# 11. Índices

- bookings.booking_date
- bookings.user_id
- bookings.slot_id
- profiles.alias
- profiles.email
- blocked_days.date
- access_requests.status

---

# 12. Política de borrado

Los usuarios nunca se eliminan.

Se marcan como:

```
status = disabled
```

---

# 13. Integridad

La base de datos debe impedir:

- viviendas duplicadas
- alias duplicados
- reservas duplicadas
- días bloqueados duplicados

---

# 14. Seguridad

Todas las tablas utilizarán RLS.

Cada usuario solo podrá acceder a sus propios datos.

---

# 15. Migraciones

Todo cambio del esquema deberá realizarse mediante migraciones de Supabase.

---

# 16. Futuras ampliaciones

El modelo permitirá evolucionar hacia:

- múltiples pistas
- historial de reservas
- estadísticas
- reservas recurrentes
- panel de administración
