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
Azul claro
```

Puede reservarse.

## Expirado

Color:

```text
Gris
```

No puede reservarse. Para el día actual, expira cuando la hora de Madrid es
igual o posterior a `end_time + 1 minuto`. Durante el minuto de finalización
continúa vigente.

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
Usuario pulsa slot azul claro
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

## Fecha y temporada válidas

La fecha solicitada debe pertenecer a los siete días reservables calculados en `Europe/Madrid`, aplicando el rollover de las 22:01 en invierno o de las 23:01 en verano.

El slot solicitado debe pertenecer a la temporada aplicable a esa fecha.

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

La función RPC `create_booking` se ejecuta de forma atómica en PostgreSQL. Un índice único parcial sobre `(booking_date, slot_id)` para estados `active` y `maintenance` garantiza la integridad física contra condiciones de carrera sin impedir que una reserva cancelada libere la franja.

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

- La aplicación invoca la función RPC `cancel_booking(p_booking_id)`.
- La función valida en backend que la reserva existe, pertenece al usuario autenticado y está en estado `active`.
- La reserva cambia a estado `cancelled_by_user`.
- La aplicación inserta una notificación en `notifications` con su `event_date`.
- La interfaz se actualiza.

---

# Estados de Reserva

## active

Reserva activa.

Solo cuenta como activa mientras no haya alcanzado `end_time + 1 minuto` en
`Europe/Madrid`.

## completed

Reserva finalizada. No cuenta para límites, horario repetido ni máximo diario,
y no aparece en Mis reservas. Permanece en base de datos hasta su eliminación
manual.

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

Un temporizador dirigido al siguiente `end_time + 1 minuto` ejecuta
`complete_expired_bookings()`, refresca Reservas y Mis reservas, y programa el
siguiente evento. La misma regla se aplica en `create_booking()` y en la UI.

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
