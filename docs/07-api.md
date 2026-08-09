# Jardines de hercules Pista Padel

## 07 - API

**Versión:** 1.0

Este documento define el contrato entre el frontend (Nuxt) y el backend (Supabase).

La aplicación deberá minimizar el acceso directo a las tablas y centralizar toda la lógica de negocio en funciones o servicios reutilizables.

---

# 1. Principios

- Toda validación crítica se realizará en el backend.
- El frontend nunca confiará en su propio estado.
- Las respuestas deberán ser consistentes.
- Todas las operaciones devolverán errores controlados.

---

# 2. Operaciones principales

## Autenticación

- Iniciar sesión
- Cerrar sesión
- Recuperar contraseña
- Obtener sesión actual

---

## Usuario

- Obtener perfil
- Actualizar alias

---

## Solicitudes de acceso

- Crear solicitud de acceso

---

## Reservas

- Obtener calendario de los próximos 7 días
- Crear reserva
- Cancelar reserva
- Obtener mis reservas

---

## Configuración

- Obtener normas
- Obtener información "Acerca de"
- Obtener temporada activa

---

## Notificaciones

- Obtener listado de notificaciones

---

# 3. Formato de respuesta

Todas las operaciones deberán devolver una estructura uniforme.

## Respuesta correcta

```json
{
  "success": true,
  "data": {}
}
```

## Respuesta con error

```json
{
  "success": false,
  "error": {
    "code": "BOOKING_LIMIT_REACHED",
    "message": "Has alcanzado el máximo de reservas."
  }
}
```

---

# 4. Códigos de error

- UNAUTHORIZED
- USER_DISABLED
- INVALID_SLOT
- SLOT_ALREADY_BOOKED
- BOOKING_LIMIT_REACHED
- DUPLICATE_TIME_SLOT
- DUPLICATE_DAY_BOOKING
- DAY_BLOCKED
- BOOKING_NOT_FOUND
- CANCELLATION_NOT_ALLOWED
- VALIDATION_ERROR
- INTERNAL_ERROR

---

# 5. Validaciones

Antes de crear una reserva deberán comprobarse:

- Usuario autenticado.
- Usuario activo.
- Día visible.
- Día no bloqueado.
- Slot disponible.
- Menos de tres reservas activas.
- Horario no repetido.
- Sin otra reserva ese mismo día.

---

# 6. Idempotencia

Una misma petición repetida nunca deberá generar dos reservas.

---

# 7. Seguridad

Nunca aceptar:

- user_id
- alias
- email

como fuente de verdad desde el frontend.

El usuario autenticado siempre se obtendrá mediante Supabase Auth.

---

# 8. Rendimiento

Evitar múltiples consultas para una misma operación.

Priorizar consultas únicas y funciones reutilizables.

---

# 9. Versionado

Todas las nuevas funcionalidades deberán mantener compatibilidad con las operaciones existentes.

---

# 10. Checklist

- Respuestas homogéneas.
- Errores tipificados.
- Validaciones en backend.
- Sin lógica crítica en frontend.
- Operaciones reutilizables.
