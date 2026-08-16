# 01 - Business Rules

## Objetivo

Este documento define las reglas de negocio que rigen el funcionamiento de la aplicación Jardines de Hércules II - Pista de Pádel.

---

## Usuarios

### Un usuario por vivienda

Solo puede existir un usuario asociado a cada vivienda.

Una vivienda queda identificada por:

- Escalera
- Planta
- Puerta

La validación se realizará tanto a nivel de aplicación como mediante restricciones en base de datos.

---

## Alias

### Reglas generales

- El alias es obligatorio.
- Debe tener entre 3 y 20 caracteres.
- Se eliminarán automáticamente los espacios al inicio y al final.
- La comparación será case-insensitive.
- El alias debe ser único.

### Alias reservados

No podrán utilizarse los siguientes alias:

- admin
- administrador
- presidente
- system
- sistema

---

## Autenticación

### Acceso

El acceso se realizará mediante:

- Email
- Contraseña

### Persistencia de sesión

La sesión permanecerá abierta hasta que el usuario pulse la opción "Salir".

### Recuperación de contraseña

No existe recuperación automática de contraseña.

Si el usuario olvida la contraseña deberá contactar con el presidente de la comunidad.

### Cambio de contraseña

No existe funcionalidad de cambio de contraseña.

---

## Usuarios deshabilitados

Los usuarios pueden ser deshabilitados por el administrador.

Si un usuario deshabilitado intenta utilizar la aplicación:

1. Se cerrará automáticamente la sesión.
2. Será redirigido a Login.
3. Se mostrará un mensaje informativo.

---

## Calendario de reservas

### Ventana visible

El calendario mostrará siempre:

- Día actual.
- Seis días adicionales.

Total:

- 7 días visibles.

### Navegación

No existe navegación a semanas futuras ni pasadas.

Solo se muestran los días reservables.

### Actualización automática

Invierno:

- 22:01

Verano:

- 23:01

En ese momento:

- Se elimina el día actual.
- Se añade un nuevo día al final.

Todas las fechas y cálculos de rollover se rigen por la zona horaria `Europe/Madrid`.

---

## Reglas de reserva

### Máximo de reservas activas

Cada usuario podrá tener:

- Máximo 3 reservas activas.

Una reserva deja de considerarse activa cuando la hora local de Madrid alcanza
`slots.end_time + 1 minuto`, aunque su estado aún no haya sido regularizado.

### Máximo de reservas por día

Cada usuario podrá tener:

- Máximo 1 reserva por día.

### Horarios repetidos

Un usuario no podrá repetir el mismo slot horario (`slot_id`) entre sus reservas activas, independientemente del día de la semana.

### Reserva directa vía RPC

Las reservas se realizan al pulsar un slot libre invocando la función RPC `create_booking()`.

No existe confirmación previa.

### Concurrencia y Validaciones

Si varios usuarios intentan reservar el mismo slot:

- El primero que complete correctamente la operación atómica obtiene la reserva.

Todas las validaciones críticas (usuario activo, máximo 3 reservas, máximo 1 al día, horario no repetido y slot libre) se realizan atómicamente en el backend mediante la función RPC `create_booking()`.

### Cancelación vía RPC

Las cancelaciones se realizan mediante la función RPC `cancel_booking(p_booking_id)`.

La función valida atómicamente que la reserva existe, pertenece al usuario autenticado y tiene estado `active` antes de cambiar su estado a `cancelled_by_user`.

---

## Estados visuales del calendario

### Azul claro

Slot libre y reservable.

### Gris

Slot expirado y no reservable.

### Negro

Slot no disponible.

Incluye:

- Reservas de otros vecinos.
- Mantenimiento.

### Rojo

Reserva propia.

---

## Mis reservas

### Contenido

Solo se mostrarán reservas activas.

Las reservas finalizadas pasan a `completed` y no se muestran.

No existe histórico.

### Orden

Las reservas se mostrarán ordenadas por fecha ascendente.

La más próxima aparecerá primero.

### Cancelación

Al pulsar una reserva:

- Se mostrará una ventana de confirmación.
- El usuario podrá cancelar la reserva.
- Tras la cancelación, la aplicación insertará la notificación correspondiente.

---

## Notificaciones

### Alcance

Las notificaciones son comunes para todos los vecinos.

### Creación

Tras una reserva o cancelación con éxito, la propia aplicación realizará el `INSERT` de la notificación asociada. Los usuarios autenticados disponen de permisos para consultar e insertar notificaciones.

### Orden

Se mostrarán por fecha descendente.

Las más recientes aparecerán primero.

### Límite

No existe límite de notificaciones.

### Lectura

No existe sistema de leídas o no leídas.

### Visibilidad

Solo se mostrarán notificaciones cuyo campo `event_date` corresponda a los 7 días visibles en el calendario.

---

## Mantenimiento

### Gestión

La gestión del mantenimiento será completamente manual desde Supabase.

### Procedimiento

El administrador:

1. Elimina manualmente las reservas afectadas.
2. Crea manualmente registros de mantenimiento en `bookings` asignando el ID del usuario técnico permanente `"AdminJdH"` (`user_id NOT NULL`).
3. Crea manualmente las notificaciones necesarias.

### Alcance

El mantenimiento se gestiona exclusivamente por franjas horarias.

Para bloquear un día completo se crearán registros de mantenimiento para todas las franjas de ese día.

---

## Normas de uso

Las normas de uso son contenido estático.

Se almacenarán en ficheros JSON o TypeScript.

---

## Acerca de

La información de la pantalla Acerca de es contenido estático.

Se almacenará en ficheros JSON o TypeScript.

---

## Funcionalidades excluidas

No forman parte del proyecto:

- Panel de administración.
- Recuperación automática de contraseña.
- Cambio de contraseña.
- Registro automático.
- Sistema de incidencias.
- Sistema de sanciones.
- Histórico de reservas.
- Gestión de múltiples pistas.
- Navegación por semanas futuras.
