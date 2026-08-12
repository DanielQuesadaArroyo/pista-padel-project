# 13 - User Flows

## Objetivo

Este documento describe los flujos funcionales principales de la aplicación Jardines de Hércules II - Pista de Pádel.

Su objetivo es servir como referencia para la implementación y validación del comportamiento esperado.

---

# Flujo 1 - Inicio de Sesión

## Escenario

Usuario accede a la aplicación sin sesión activa.

## Flujo

```text
Abrir aplicación
↓
Pantalla Login
↓
Introducir email
↓
Introducir contraseña
↓
Pulsar Iniciar sesión
↓
Validación Supabase Auth
↓
Carga perfil usuario
↓
Comprobar active = true
↓
Acceso concedido
↓
Pantalla Notificaciones
```

---

# Flujo 2 - Usuario Deshabilitado

## Escenario

Usuario autenticado cuyo perfil ha sido desactivado.

## Flujo

```text
Usuario autenticado
↓
profiles.active = false
↓
Cerrar sesión automáticamente
↓
Redirigir a Login
↓
Mostrar mensaje:

"Su acceso ha sido deshabilitado.
Contacte con el presidente de la comunidad."
```

---

# Flujo 3 - Recuperación de Contraseña

## Escenario

Usuario olvida su contraseña.

## Flujo

```text
Pantalla Login
↓
Pulsar "¿Olvidaste tu contraseña?"
↓
Mostrar mensaje:

"Contacte con el presidente de la comunidad para recuperar su acceso."
```

---

# Flujo 4 - Consultar Notificaciones

## Escenario

Usuario autenticado.

## Flujo

```text
Login correcto
↓
Pantalla Notificaciones
↓
Visualizar listado
↓
Scroll vertical
```

---

# Flujo 5 - Abrir Menú

## Escenario

Usuario autenticado.

## Flujo

```text
Pulsar icono menú
↓
Abrir menú lateral
↓
Seleccionar opción
↓
Navegar a pantalla correspondiente
```

---

# Flujo 6 - Reservar Pista

## Escenario

Usuario realiza una reserva válida.

## Flujo

```text
Pantalla Reservas
↓
Seleccionar slot gris
↓
Llamar RPC create_booking()
↓
Validaciones atómicas backend
↓
Reserva creada
↓
App inserta notificación (with event_date)
↓
Actualizar calendario
↓
Slot rojo
```

---

# Flujo 7 - Máximo de Reservas Alcanzado

## Escenario

Usuario posee 3 reservas activas.

## Flujo

```text
Pantalla Reservas
↓
Pulsar slot libre
↓
Llamar RPC create_booking()
↓
Validación backend
↓
Error

"Ha alcanzado el máximo de 3 reservas activas."
```

---

# Flujo 8 - Segunda Reserva el Mismo Día

## Escenario

Usuario intenta reservar dos veces el mismo día.

## Flujo

```text
Pulsar slot libre
↓
Llamar RPC create_booking()
↓
Validación backend
↓
Error

"Ya dispone de una reserva para ese día."
```

---

# Flujo 9 - Horario Repetido

## Escenario

Usuario intenta reservar una franja horaria (`slot_id`) ya utilizada en otra reserva activa.

## Flujo

```text
Pulsar slot libre
↓
Llamar RPC create_booking()
↓
Validación backend
↓
Error

"Ya dispone de una reserva en esa franja horaria."
```

---

# Flujo 10 - Concurrencia

## Escenario

Dos usuarios intentan reservar el mismo slot.

## Flujo

```text
Usuario A pulsa reservar
Usuario B pulsa reservar
↓
Llamada a RPC create_booking()
↓
Validaciones atómicas en PostgreSQL (bloqueo atómico / UNIQUE)
↓
Usuario A obtiene reserva
↓
Usuario B recibe error
```

---

# Flujo 11 - Cancelar Reserva desde Reservas

## Escenario

Usuario pulsa una reserva propia.

## Flujo

```text
Pantalla Reservas
↓
Pulsar slot rojo
↓
Mostrar modal cancelar
↓
Confirmar
↓
Llamar RPC cancel_booking()
↓
Validaciones atómicas backend
↓
Generar notificación
↓
Actualizar calendario
```

---

# Flujo 12 - Cancelar Reserva desde Mis Reservas

## Escenario

Usuario cancela una reserva desde su listado.

## Flujo

```text
Mis reservas
↓
Seleccionar reserva
↓
Mostrar modal cancelar
↓
Confirmar
↓
Llamar RPC cancel_booking()
↓
Validaciones atómicas backend
↓
Generar notificación
```

---

# Flujo 13 - Cancelación Abortada

## Escenario

Usuario cierra la modal.

## Flujo

```text
Modal cancelar
↓
Pulsar Cancelar
↓
Cerrar modal
↓
Sin cambios
```

---

# Flujo 14 - Cambiar Alias

## Escenario

Usuario modifica su alias.

## Flujo

```text
Pantalla Cambiar alias
↓
Introducir nuevo alias
↓
Validaciones
↓
Guardar
↓
Actualizar perfil
↓
Mostrar confirmación
```

---

# Flujo 15 - Alias Duplicado

## Escenario

Alias ya utilizado.

## Flujo

```text
Guardar alias
↓
Validación backend
↓
Error
```

---

# Flujo 16 - Consultar Normas de Uso

## Escenario

Usuario desea consultar las normas.

## Flujo

```text
Menú
↓
Normas de uso
↓
Carga contenido estático
↓
Scroll lectura
```

---

# Flujo 17 - Consultar Acerca de

## Escenario

Usuario desea consultar información de la aplicación.

## Flujo

```text
Menú
↓
Acerca de
↓
Carga contenido estático
↓
Scroll lectura
```

---

# Flujo 18 - Cerrar Sesión

## Escenario

Usuario decide salir.

## Flujo

```text
Menú
↓
Salir
↓
supabase.auth.signOut()
↓
Eliminar sesión
↓
Login
```

---

# Flujo 19 - Actualización Realtime de Reservas

## Escenario

Otro usuario crea o cancela una reserva.

## Flujo

```text
Cambio en bookings
↓
Evento Realtime
↓
Actualizar calendario
↓
Actualizar Mis reservas
```

---

# Flujo 20 - Actualización Realtime de Notificaciones

## Escenario

Nueva notificación.

## Flujo

```text
Cambio en notifications
↓
Evento Realtime
↓
Actualizar pantalla Notificaciones
```
