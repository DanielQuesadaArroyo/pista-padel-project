# 16 - Roadmap

## Objetivo

Este documento define el roadmap de implementación de la aplicación Jardines de Hércules II - Pista de Pádel.

El objetivo es construir el producto por fases, validando cada bloque antes de continuar con el siguiente.

---

# Fase 1 - Preparación del Proyecto

## Objetivos

- Crear proyecto Nuxt.
- Configurar TypeScript.
- Configurar Supabase.
- Configurar entorno local.
- Crear estructura de carpetas.

## Entregables

- Proyecto inicial funcionando.
- Conexión con Supabase.
- Variables de entorno configuradas.

---

# Fase 2 - Base de Datos

## Objetivos

Implementar:

- profiles
- settings
- slots
- bookings
- notifications

## Entregables

- Script SQL completo.
- Índices.
- Restricciones.
- RLS.
- Datos iniciales.

---

# Fase 3 - Autenticación

## Objetivos

Implementar:

- Login.
- Logout.
- Persistencia de sesión.
- Validación de usuario activo.

## Entregables

- Pantalla Login.
- Protección de rutas.
- Cierre automático de sesión para usuarios deshabilitados.

---

# Fase 4 - Layout Base

## Objetivos

Implementar:

- Menú lateral.
- Navegación.
- Layout principal.

## Entregables

- Estructura visual completa.
- Navegación entre pantallas.

---

# Fase 5 - Notificaciones

## Objetivos

Implementar:

- Pantalla Notificaciones.
- Lectura desde base de datos.
- Realtime.

## Entregables

- Listado funcional.
- Actualización automática.

---

# Fase 6 - Calendario de Reservas

## Objetivos

Implementar:

- Calendario.
- Carga de slots.
- Carga de reservas.
- Estados visuales.

## Entregables

- Vista completa del calendario.
- Diferenciación visual de estados.

---

# Fase 7 - Lógica de Reservas

## Objetivos

Implementar:

- Crear reserva.
- Cancelar reserva.
- Validaciones de negocio.
- Control de concurrencia.

## Entregables

- Reservas completamente operativas.

---

# Fase 8 - Mis Reservas

## Objetivos

Implementar:

- Listado de reservas propias.
- Cancelación desde listado.

## Entregables

- Pantalla funcional.

---

# Fase 9 - Cambio de Alias

## Objetivos

Implementar:

- Formulario.
- Validaciones.
- Persistencia.

## Entregables

- Alias editable por el usuario.

---

# Fase 10 - Contenido Estático

## Objetivos

Implementar:

- Normas de uso.
- Acerca de.

## Entregables

- Pantallas completas.

---

# Fase 11 - Realtime Completo

## Objetivos

Implementar:

- Reservas.
- Notificaciones.
- Estado del usuario.

## Entregables

- Sincronización automática.

---

# Fase 12 - Testing

## Objetivos

Ejecutar:

- Tests funcionales.
- Tests de reglas de negocio.
- Tests de seguridad.
- Tests responsive.

## Entregables

- Aplicación validada.

---

# Fase 13 - Preparación Producción

## Objetivos

- Revisar configuración.
- Revisar seguridad.
- Revisar rendimiento.

## Entregables

- Build final.

---

# Fase 14 - Despliegue

## Objetivos

- Publicar aplicación.
- Configurar dominio.
- Validar funcionamiento real.

## Entregables

- Aplicación operativa para la comunidad.

---

# MVP

La aplicación se considerará MVP cuando estén completadas las fases:

- 1
- 2
- 3
- 4
- 5
- 6
- 7
- 8
- 9
- 10
- 11

---

# Fuera del Roadmap

No se desarrollarán:

- Panel de administración.
- Recuperación automática de contraseña.
- Cambio de contraseña.
- Estadísticas.
- Chat.
- Notificaciones push.
- Sistema de incidencias.
- Sistema de sanciones.
- Reservas recurrentes.
