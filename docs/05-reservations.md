# 05 - Reservations

## Objetivo

Este documento define el funcionamiento completo del sistema de reservas de la aplicación Jardines de Hércules II - Pista de Pádel.

---

# Ventana de Reserva

## Días visibles

La aplicación mostrará siempre:

- Día actual.
- Seis días adicionales.

Total:

- 7 días visibles.

## Ejemplo

Si hoy es:

```text
Martes 10
```

Se mostrarán:

```text
Martes 10
Miércoles 11
Jueves 12
Viernes 13
Sábado 14
Domingo 15
Lunes 16
```

---

# Actualización Automática

## Temporada de invierno

La última franja finaliza a:

```text
22:00
```

A las:

```text
22:01
```

Se realizará:

- Eliminación del día actual.
- Adición de un nuevo día al final.

---

## Temporada de verano

La última franja finaliza a:

```text
23:00
```

A las:

```text
23:01
```

Se realizará:

- Eliminación del día actual.
- Adición de un nuevo día al final.

---

# Navegación

No existe:

- Calendario mensual.
- Navegación semanal.
- Selección manual de fechas.
- Consulta de fechas futuras.

Solo se mostrarán los días reservables.

---

# Horarios

Los horarios se obtendrán desde la tabla:

```text
slots
```

La aplicación seleccionará automáticamente:

```text
summer
```

o

```text
winter
```

según la configuración almacenada en:

```text
settings
```

---

# Estados de los Slots

## Libre

Color:

```text
Gris
```

Puede reservarse.

---

## Ocupado

Color:

```text
Negro
```

No puede reservarse.

---

## Mantenimiento

Color:

```text
Negro
```

Visualmente idéntico a un slot ocupado.

No puede reservarse.

---

## Reserva propia

Color:

```text
Rojo
```

Identifica una reserva del usuario autenticado.

---

# Creación de Reservas

## Comportamiento

La reserva se realiza directamente al pulsar un slot libre invocando la función RPC `create_booking()`.

No existe confirmación previa.

---

## Flujo

```text
Usuario pulsa slot gris
↓
Llamada a RPC create_booking()
↓
Validaciones atómicas en backend
↓
Reserva creada en bookings
↓
Aplicación realiza INSERT en notifications
↓
Actualización de interfaz
```

---

# Validaciones

Todas las validaciones se realizan atómicamente en backend mediante la función RPC `create_booking(p_slot_id, p_booking_date)`.

---

## Usuario activo

Debe cumplirse:

```text
profiles.active = true
```

---

## Máximo de reservas activas

Cada usuario podrá tener:

```text
Máximo 3 reservas activas
```

Si se supera:

```text
Ha alcanzado el máximo de 3 reservas activas.
```

---

## Máximo una reserva por día

Cada usuario podrá tener:

```text
Máximo 1 reserva por día
```

Si se incumple:

```text
Ya dispone de una reserva para ese día.
```

---

## Horario repetido

Un usuario no podrá repetir el mismo slot horario (`slot_id`) entre sus reservas activas, independientemente del día de la semana.

Ejemplo:

```text
Martes 20:00 (Slot 5)
Jueves 20:00 (Slot 5)
```

No permitido.

Mensaje:

```text
Ya dispone de una reserva en esa franja horaria.
```

---

## Disponibilidad

El slot debe encontrarse libre.

Si otro usuario lo ha reservado previamente:

```text
La reserva ya no está disponible.
```

---

# Concurrencia

## Regla

Si varios usuarios intentan reservar el mismo slot simultáneamente:

```text
El primero que complete correctamente la función RPC create_booking obtiene la reserva.
```

## Implementación

La función RPC `create_booking` se ejecuta de forma atómica en PostgreSQL y la restricción:

```sql
UNIQUE(booking_date, slot_id)
```

garantiza la integridad física contra condiciones de carrera.

---

# Notificaciones

Tras la creación de una reserva correcta en la función RPC, la propia aplicación insertará la notificación correspondiente en la tabla `notifications` indicando el `event_date` (fecha reservada).

Ejemplo:

```text
Pepito ha reservado la pista el 12/08/2026 de 20:00 a 21:30.
```

El alias mostrado será siempre el alias actual del usuario.

---

# Cancelación de Reservas

## Ubicación

Las reservas se cancelan desde:

```text
Mis reservas
```

o pulsando sobre una reserva propia en:

```text
Reservas
```

---

## Confirmación

Siempre se mostrará la modal de confirmación.

Texto:

```text
¿Está seguro de que desea cancelar esta reserva?
```

Botones:

```text
Confirmar
Cancelar
```

---

## Resultado

Al confirmar:

- La reserva cambia a estado `cancelled_by_user`.
- La aplicación inserta una notificación en `notifications` con su `event_date`.
- La interfaz se actualiza.

---

# Estados de Reserva

## active

Reserva activa.

---

## cancelled_by_user

Reserva cancelada por el usuario.

---

## cancelled_by_admin

Reserva cancelada por administración.

---

## maintenance

Franja bloqueada por mantenimiento.

---

# Mis Reservas

## Contenido

Solo se mostrarán reservas activas.

No existe histórico.

---

## Orden

Fecha ascendente.

La reserva más próxima aparece primero.

---

## Estado vacío

Mensaje:

```text
No dispone de reservas activas.
```

---

# Mantenimiento

## Gestión

Completamente manual.

Realizada directamente en Supabase.

---

## Procedimiento

1. Eliminar reservas afectadas.
2. Crear registros maintenance.
3. Crear notificaciones necesarias.

---

## Día completo

Para bloquear un día completo se crearán registros maintenance para todas las franjas horarias del día.

---

# Funcionalidades Excluidas

No forman parte del sistema:

- Lista de espera.
- Sorteos.
- Prioridades.
- Reservas recurrentes.
- Reservas múltiples.
- Confirmaciones por email.
- Recordatorios.
- Histórico de reservas.
