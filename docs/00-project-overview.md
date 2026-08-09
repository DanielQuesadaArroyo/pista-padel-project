# Jardines de hercules Pista Padel

## 00 - Project Overview

**Versión:** 1.0  
**Estado:** Documento Maestro  
**Tecnologías:** Nuxt 4 + Vue 3 + Supabase

---

# 1. Objetivo del proyecto

Jardines de hercules Pista Padel es una aplicación web privada diseñada para gestionar la reserva de la pista de pádel de una comunidad de propietarios formada por aproximadamente **220 viviendas**.

La aplicación debe sustituir completamente cualquier sistema manual de reservas (papel, WhatsApp, etc.) ofreciendo una experiencia sencilla, rápida y justa para todos los vecinos.

El objetivo principal es que cualquier vecino pueda realizar una reserva en menos de **10 segundos** desde su teléfono móvil.

---

# 2. Alcance del proyecto

La aplicación únicamente gestiona:

- Reserva de una única pista de pádel.
- Consulta de disponibilidad.
- Gestión de reservas propias.
- Consulta de normas de uso.
- Consulta de notificaciones.
- Cambio de alias.

No pretende convertirse en una plataforma social ni en una aplicación de gestión de comunidades.

---

# 3. Público objetivo

La aplicación está dirigida exclusivamente a los propietarios e inquilinos autorizados de la comunidad.

Cada vivienda dispone de un único usuario.

No existen cuentas públicas.

No existe registro libre.

---

# 4. Filosofía del producto

La filosofía de Jardines de hercules Pista Padel se basa en cinco principios.

## Simplicidad

La aplicación debe poder utilizarla cualquier vecino sin necesidad de formación.

Cada pantalla debe tener un único objetivo.

Nunca se añadirán funcionalidades que compliquen el uso diario.

---

## Rapidez

Reservar una pista debe requerir el mínimo número de pasos posible.

No existirán pantallas innecesarias de confirmación.

El usuario pulsa sobre una franja libre y la reserva queda realizada inmediatamente.

---

## Equidad

Las reglas de negocio están diseñadas para repartir el uso de la pista entre todos los vecinos.

Ejemplos:

- máximo de reservas semanales
- una reserva por día
- horarios distintos durante la semana

Todas estas reglas deben validarse automáticamente.

---

## Privacidad

Los vecinos sólo podrán ver el alias del usuario que ha reservado la pista de padel en la pantalla de Notificaciones.

En el calendario únicamente se visualizará el estado de cada franja mediante colores.

En el calendario no se mostrará:

- nombre
- email
- vivienda
- alias

---

## Fiabilidad

Nunca deben existir dos reservas para el mismo horario.

Toda la lógica crítica debe ejecutarse en el backend.

El frontend nunca será considerado una fuente de verdad.

---

# 5. Tecnologías

## Frontend

- Nuxt 4
- Vue 3
- TypeScript
- Tailwind CSS
- Nuxt UI
- Pinia
- VueUse

## Backend

Supabase como plataforma única para:

- Base de datos PostgreSQL
- Autenticación
- Realtime
- Storage
- Edge Functions (si fueran necesarias)

---

# 6. Arquitectura general

La aplicación estará dividida en dos capas.

## Frontend

Responsable de:

- interfaz
- navegación
- validaciones básicas
- experiencia de usuario

Nunca será responsable de las reglas críticas del negocio.

---

## Backend

Responsable de:

- autenticación
- reglas de reserva
- validaciones
- concurrencia
- sincronización
- permisos
- persistencia

Toda regla importante debe validarse aquí.

---

# 7. Realtime

La aplicación debe actualizar automáticamente todas las reservas mediante Supabase Realtime.

Cuando un usuario reserve una pista:

- el resto de usuarios debe ver el cambio inmediatamente
- no será necesario refrescar la página

---

# 8. Mobile First

La aplicación está pensada principalmente para teléfonos móviles.

Posteriormente deberá adaptarse correctamente a tablets y escritorio.

El diseño debe priorizar:

- botones grandes
- navegación sencilla
- mínimo número de clics
- buena legibilidad

---

# 9. Administración

La aplicación NO tendrá un panel de administración.

El administrador utilizará exactamente la misma aplicación que cualquier vecino.

Las tareas administrativas se realizarán directamente desde Supabase.

Desde la base de datos podrá:

- Crear usuarios manualmente
- activar usuarios
- desactivar usuarios
- bloquear días de mantenimiento anulando las reservas de ese día
- desbloquear días
- modificar las normas
- modificar el contenido de "Acerca de"

No podrá:

- editar reservas
- crear reservas manuales

---

# 10. Restricciones importantes

La aplicación solo gestionará una pista.

No habrá:

- ligas
- torneos
- ranking
- chat
- mensajería
- pagos
- estadísticas avanzadas
- múltiples pistas

El objetivo es mantener una aplicación extremadamente sencilla y fácil de mantener.

---

# 11. Objetivos de calidad

La aplicación debe cumplir los siguientes requisitos.

## Rendimiento

- carga inicial inferior a 2 segundos
- navegación fluida
- realtime inferior a 1 segundo

---

## Seguridad

- Supabase Auth
- RLS activas
- validaciones en backend

---

## Escalabilidad

Aunque inicialmente existen aproximadamente 220 viviendas, la arquitectura debe permitir ampliar el número de usuarios sin modificaciones importantes.

---

## Mantenibilidad

El código deberá ser:

- limpio
- modular
- reutilizable
- tipado con TypeScript
- fácil de mantener

---

# 12. Principios para el desarrollo con IA

Toda la aplicación será desarrollada utilizando asistentes de IA.

Por este motivo es imprescindible mantener una documentación clara y actualizada.

Los documentos de la carpeta `/docs` representan la única fuente de verdad del proyecto.

Si existe alguna contradicción entre documentos, siempre prevalecerán las reglas de negocio definidas en `01-business-rules.md`.

Ningún asistente de IA deberá inventar funcionalidades que no estén documentadas.

En caso de duda, deberá solicitar aclaración antes de implementar una solución.
