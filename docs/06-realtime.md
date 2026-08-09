# Jardines de hercules Pista Padel

## 06 - Realtime

**Versión:** 1.0

Este documento define el comportamiento en tiempo real de la aplicación mediante Supabase Realtime.

---

# 1. Objetivo

Todos los usuarios deben visualizar el mismo estado de la pista sin recargar la página.

---

# 2. Tecnología

- Supabase Realtime
- PostgreSQL Changes

No se utilizarán WebSockets personalizados.

---

# 3. Eventos

La aplicación reaccionará a:

- Nueva reserva.
- Cancelación de reserva.
- Bloqueo de un día.
- Desbloqueo de un día.
- Cambio de temporada.
- Cambio de estado del usuario (active/disabled).

---

# 4. Flujo

1. Backend confirma la operación.
2. PostgreSQL persiste los datos.
3. Supabase Realtime publica el evento.
4. Todos los clientes reciben el cambio.
5. La interfaz se actualiza automáticamente.

---

# 5. Suscripciones

El calendario deberá permanecer suscrito mientras la pantalla esté abierta.

Las suscripciones deberán cerrarse al abandonar la pantalla.

---

# 6. Sincronización

Nunca modificar el estado únicamente desde el frontend.

Toda actualización deberá provenir del backend y de Realtime.

---

# 7. Reconexión

Si se pierde la conexión:

- intentar reconectar automáticamente;
- al recuperar la conexión, refrescar el estado completo.

---

# 8. Conflictos

Si un usuario intenta reservar una franja ya ocupada debido a un cambio recibido por Realtime:

- cancelar la operación;
- mostrar un Toast indicando que la franja ya no está disponible.

---

# 9. Rendimiento

Solo actualizar los elementos afectados.

No recargar toda la aplicación.

---

# 10. Checklist

- Actualización automática.
- Sin recargar la página.
- Reconexión automática.
- Limpieza de suscripciones.
- Estado consistente entre todos los clientes.
