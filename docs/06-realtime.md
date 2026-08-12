# 06 - Realtime

## Objetivo

Este documento define el uso de funcionalidades Realtime dentro de la aplicación Jardines de Hércules II - Pista de Pádel.

El objetivo es garantizar que los usuarios visualicen los cambios importantes sin necesidad de recargar manualmente la aplicación.

---

# Tecnología

Se utilizará:

```text
Supabase Realtime
```

para escuchar cambios en determinadas tablas.

---

# Alcance

Realtime se utilizará únicamente donde aporte valor real a los usuarios.

No se utilizará para funcionalidades innecesarias.

---

# Tabla Bookings

## Objetivo

Actualizar automáticamente las pantallas relacionadas con reservas.

---

## Eventos escuchados

```text
INSERT
UPDATE
DELETE
```

---

## Comportamiento

Cuando se produzca un cambio en:

```text
bookings
```

la aplicación actualizará automáticamente:

- Reservas
- Mis reservas

sin necesidad de recargar la página.

---

## Casos cubiertos

### Nueva reserva

Un usuario reserva una pista.

Resultado:

- El slot cambia automáticamente.
- El resto de usuarios visualizan la ocupación.

---

### Cancelación

Un usuario cancela una reserva.

Resultado:

- El slot vuelve a estar disponible.
- El resto de usuarios visualizan el cambio.

---

### Mantenimiento

El administrador crea un registro:

```text
maintenance
```

Resultado:

- El slot queda bloqueado automáticamente.

---

# Tabla Notifications

## Objetivo

Actualizar automáticamente el panel de notificaciones.

---

## Eventos escuchados

```text
INSERT
DELETE
UPDATE
```

---

## Comportamiento

Cuando cambie una notificación:

- Se actualizará automáticamente la pantalla de Notificaciones.

---

## Casos cubiertos

### Nueva notificación

Se añade una nueva notificación.

Resultado:

- Aparece automáticamente en pantalla.

---

### Eliminación

Se elimina una notificación.

Resultado:

- Desaparece automáticamente.

---

# Tabla Profiles

## Objetivo

Detectar cambios relevantes sobre el usuario autenticado.

---

## Evento principal

```text
UPDATE
```

---

## Usuario deshabilitado

Si:

```text
active = false
```

la aplicación:

1. Cerrará la sesión.
2. Ejecutará signOut().
3. Redirigirá al Login.
4. Mostrará un mensaje informativo.

---

## Cambio de alias

Si el alias del usuario cambia desde otra sesión:

- La interfaz actualizará automáticamente el nuevo valor.

---

# Estrategia de Actualización

## Preferencia

Se priorizará:

```text
Realtime
```

antes que:

```text
Polling
```

---

## Polling

No se implementarán procesos periódicos de consulta.

Ejemplo:

```text
Cada 5 segundos
Cada 10 segundos
Cada 30 segundos
```

No permitidos.

---

# Reconexión

## Pérdida de conexión

Si el usuario pierde temporalmente la conexión:

- Supabase Realtime gestionará la reconexión automáticamente.

---

## Recuperación

Una vez recuperada la conexión:

- La información volverá a sincronizarse automáticamente.

---

# Rendimiento

## Volumen esperado

La comunidad tiene aproximadamente:

```text
220 viviendas
```

y un número reducido de usuarios concurrentes.

---

## Impacto

El uso de Realtime tendrá un coste muy bajo y será suficiente para el tamaño de la comunidad.

---

# Funcionalidades Excluidas

No se implementarán:

- Chats.
- Mensajería instantánea.
- Indicadores de usuario conectado.
- Presencia.
- Escritura en tiempo real.
- Contadores de usuarios online.
- WebSockets personalizados.

La funcionalidad Realtime queda limitada exclusivamente a:

- Reservas.
- Notificaciones.
- Estado del usuario.
