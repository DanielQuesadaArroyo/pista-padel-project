# AGENTS.md

# Jardines de Hércules II - Pista de Pádel

## Objetivo

Este documento define las instrucciones obligatorias para cualquier agente de IA que participe en el desarrollo del proyecto.

Aplica a:

- Claude Code
- Cursor
- Codex
- ChatGPT
- Gemini
- Cline
- Windsurf
- Cualquier otra IA utilizada durante el desarrollo

---

# Descripción del Proyecto

Jardines de Hércules II - Pista de Pádel es una aplicación web destinada a la gestión de reservas de una única pista de pádel perteneciente a una comunidad de propietarios.

La comunidad dispone de aproximadamente 220 viviendas.

La aplicación será utilizada principalmente desde teléfonos móviles.

El objetivo principal es proporcionar una experiencia sencilla, rápida y fiable para reservar la pista.

---

# Filosofía del Proyecto

Ante varias soluciones válidas:

```text
Elegir siempre la solución más simple.
```

No se debe introducir complejidad para resolver problemas poco probables.

No se debe realizar sobreingeniería.

---

# Documentación Obligatoria

Antes de generar código se debe leer:

```text
/docs/00-project-overview.md
/docs/01-business-rules.md
/docs/02-ui-ux.md
/docs/03-database.md
/docs/04-authentication.md
/docs/05-reservations.md
/docs/06-realtime.md
/docs/07-api.md
/docs/08-pages.md
/docs/09-components.md
/docs/10-testing.md
/docs/11-development-rules.md
/docs/12-setup.md
/docs/13-user-flows.md
/docs/14-state-management.md
/docs/15-ai-development-prompts.md
/docs/16-roadmap.md
/docs/17-coding-standards.md
```

Nunca asumir reglas de negocio.

Nunca inventar funcionalidades.

---

# Diseños Oficiales

Todos los diseños oficiales se encuentran en:

```text
/docs/design
```

Ejemplos:

```text
Login.png
Menu.png
Calendario.png
Calendario-full.png
My-reservas.png
Notificaciones.png
Cambio-Alias.png
Modal-Cancelar.png
Normas-Uso.png
Acerca-de.png
```

La implementación debe respetar dichos diseños.

---

# Orden de Prioridad

Si existe conflicto entre documentos:

1. 01-business-rules.md
2. 13-user-flows.md
3. 03-database.md
4. 05-reservations.md
5. Resto de documentación
6. Diseños

Las reglas de negocio siempre prevalecen.

---

# Stack Tecnológico

Frontend:

```text
Nuxt 3
Vue 3
TypeScript
Pinia
```

Backend:

```text
Supabase
```

Base de Datos:

```text
PostgreSQL
```

Realtime:

```text
Supabase Realtime
```

---

# Tecnologías Prohibidas

No implementar:

```text
Backend propio
GraphQL
Microservicios
Redux
Vuex
MobX
Zustand
WebSockets propios
Polling
```

---

# Arquitectura

Frontend:

```text
Nuxt
```

Backend:

```text
Supabase
```

Toda la lógica crítica debe ejecutarse en backend.

---

# Estructura del Proyecto

```text
/docs
/docs/design

/pages
/components
/stores
/services
/composables
/types
/assets
/public
```

---

# Gestión de Usuarios

Los usuarios son creados manualmente.

No existe:

```text
Registro público
```

No existe:

```text
Panel de administración
```

No existe:

```text
Gestión de usuarios desde la aplicación
```

---

# Autenticación

Autenticación exclusivamente mediante:

```text
Supabase Auth
```

No implementar:

```text
OAuth
Google Login
Magic Link
Registro público
```

---

# Contraseñas

No implementar:

```text
Cambio de contraseña
```

No implementar:

```text
Recuperación automática de contraseña
```

Si el usuario olvida su contraseña:

```text
Contacte con el presidente de la comunidad.
```

---

# Persistencia de Sesión

La sesión debe permanecer iniciada.

Solo debe cerrarse cuando:

```text
El usuario pulse Salir.
```

---

# Usuario Deshabilitado

La tabla profiles dispone de:

```text
active
```

Si:

```text
active = false
```

La aplicación debe:

```text
Cerrar sesión.
Redirigir al Login.
Mostrar mensaje informativo.
```

---

# Alias

Restricciones:

```text
Mínimo 3 caracteres.
Máximo 20 caracteres.
Único.
Case insensitive.
```

Alias reservados:

```text
admin
administrador
presidente
system
sistema
```

---

# Calendario

Mostrar siempre:

```text
Día actual + 6 días.
```

Total:

```text
7 días visibles.
```

Ejemplo:

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

# Actualización de Ventana

Invierno:

```text
22:01
```

Verano:

```text
23:01
```

En ese momento:

```text
Desaparece el día actual.
Aparece un nuevo día al final.
```

---

# Temporadas

La aplicación utiliza:

```text
Invierno
Verano
```

Determinadas mediante:

```text
settings.summer_start
settings.summer_end
```

---

# Reservas

Reglas obligatorias.

---

## Máximo de reservas

```text
3 reservas activas.
```

---

## Máximo por día

```text
1 reserva por día.
```

---

## Horario repetido

No se puede repetir la misma franja horaria en reservas activas.

---

## Concurrencia

Gana el primer usuario que complete correctamente la operación.

Siempre que cumpla todas las validaciones.

---

## Creación

Si el usuario pulsa un slot libre:

```text
La reserva se crea directamente.
```

No existe modal de confirmación.

---

## Cancelación

Si el usuario pulsa una reserva propia:

```text
Mostrar modal cancelar.
```

---

# Mantenimiento

No existe sistema de mantenimiento.

No existe panel de mantenimiento.

El mantenimiento se realiza manualmente:

```text
Eliminar reservas afectadas.
Crear reservas maintenance.
Crear notificaciones manuales.
```

---

# Visualización de Maintenance

Las reservas maintenance se muestran:

```text
Color negro.
No reservables.
```

---

# Notificaciones

Se almacenan completas en base de datos.

Se muestran únicamente las que correspondan al rango visible del calendario.

---

# Realtime

Solo permitido para:

```text
bookings
notifications
profiles
```

No implementar:

```text
Chats
Presencia
Usuarios online
```

---

# Gestión de Estado

Utilizar:

```text
Pinia
```

Stores oficiales:

```text
authStore
profileStore
settingsStore
reservationsStore
notificationsStore
```

---

# Validaciones

Todas las reglas críticas deben validarse en backend.

Nunca confiar exclusivamente en frontend.

---

# Responsive

Prioridad absoluta:

```text
Mobile First
```

---

# Funcionalidades Fuera de Alcance

No desarrollar:

```text
Panel de administración
Cambio de contraseña
Recuperación automática de contraseña
Registro público
Chat
Incidencias
Sanciones
Estadísticas
Lista de espera
Reservas recurrentes
Notificaciones push
Integraciones externas
```

---

# Calidad de Código

Obligatorio:

```text
TypeScript estricto.
Componentes reutilizables.
Funciones pequeñas.
Código limpio.
```

Evitar:

```text
any
Código duplicado
console.log
Funciones gigantes
```

---

# Flujo Obligatorio Antes de Programar

```text
1. Leer AGENTS.md
2. Leer documentación afectada
3. Revisar diseños afectados
4. Analizar impacto
5. Implementar
6. Verificar reglas de negocio
7. Verificar diseño
```

---

# Regla Final

Si una solución es más compleja de lo necesario:

```text
Elegir la solución más simple.
```
