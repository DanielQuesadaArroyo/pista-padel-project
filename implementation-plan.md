# Plan de implementación — Jardines de Hércules II: Pista de Pádel

## Decisiones consolidadas

- La base de datos ya ha sido creada manualmente en Supabase. No se recrearán sus tablas ni se cargarán de nuevo sus datos iniciales.
- La validación final de `bbdd.json` (13-08-2026) confirma tablas, RLS, claves, restricciones, índices, triggers, permisos mínimos y RPCs. La Fase 1 está completada sin recrear tablas ni datos.
- Las reservas se crean únicamente mediante `create_booking(p_slot_id, p_booking_date)`.
- Las reservas se cancelan únicamente mediante `cancel_booking(p_booking_id)`.
- No se permiten `INSERT` ni `UPDATE` directos sobre `bookings` desde la aplicación.
- La aplicación inserta la notificación solo después de que la RPC de creación o cancelación finalice correctamente. No se usan triggers.
- Las fechas, temporadas y ventana de reserva se calculan con `Europe/Madrid`.
- Las reservas de mantenimiento pertenecen al usuario administrativo real `AdminJdH` y su `user_id` nunca es nulo.

## Fase 0 — Normalizar el proyecto como Nuxt

El repositorio actual conserva la estructura y scripts de una plantilla Vite. Antes de desarrollar funcionalidad se migrará a una estructura Nuxt coherente con la documentación: `pages/`, `components/`, `layouts/`, `middleware/`, `stores/`, `services/`, `types/` y `utils/` en la raíz del proyecto. Los scripts de desarrollo, compilación y comprobación de tipos usarán Nuxt.

**Entregable:** aplicación Nuxt arrancable, con `@nuxtjs/supabase` y Pinia configurados.

## Fase 1 — Base de datos y seguridad

Validar el esquema ya existente contra `docs/01-business-rules.md`, `docs/03-database.md` y `docs/05-reservations.md`. No se crearán de nuevo `profiles`, `settings`, `slots`, `bookings` ni `notifications`, ni se recargarán datos. Se documentará una migración SQL versionada de ajuste únicamente si la comprobación directa de Supabase detecta elementos ausentes o incorrectos.

### Estado de la validación documental

`bbdd.json` confirma los cinco conjuntos de columnas, valores por defecto, RLS, claves principales y foráneas, alias `citext` único, vivienda única, los triggers de `updated_at` y las dos RPC requeridas. También confirma el `CHECK` de temporadas de los slots y de estados de reserva.

- El índice único parcial `bookings_active_maintenance_date_slot_key` bloquea únicamente los estados `active` y `maintenance`; una reserva cancelada libera su franja en la fecha correspondiente.
- `create_booking` valida usuario activo, ventana de siete días y rollover en `Europe/Madrid`, temporada del slot, mantenimiento, límites y concurrencia. `cancel_booking` valida autenticación, propiedad y estado activo.
- Alias, slots y configuración global tienen las restricciones requeridas. Las RPC usan `SECURITY DEFINER`, `search_path` seguro y ejecución limitada a `authenticated`.
- Los usuarios autenticados solo pueden leer su propio perfil y actualizar su alias; las operaciones manuales siguen disponibles desde Supabase para el administrador.

### Integridad de datos

- Alias único sin distinguir mayúsculas/minúsculas, con longitud de 3 a 20 caracteres y exclusión de alias reservados.
- Vivienda única por `(staircase, floor, door)`.
- `settings` tendrá un único registro de configuración.
- Cada slot tendrá una temporada válida, `start_time < end_time` y no podrá repetirse dentro de una temporada.
- La ocupación será única solo mientras bloquee la pista: índice único parcial sobre `(booking_date, slot_id)` para estados `active` y `maintenance`. Las reservas canceladas liberan el slot.
- `updated_at` se actualizará mediante trigger de base de datos en las tablas que lo declaran.

### RLS y permisos

- `profiles`: cada usuario lee su propio perfil. El cambio de alias se limitará a ese campo; no podrá alterar vivienda ni `active`.
- `settings` y `slots`: lectura para usuarios autenticados; sin escrituras desde la aplicación.
- `bookings`: lectura para usuarios autenticados para construir el calendario; sin `INSERT`, `UPDATE` ni `DELETE` directos desde la aplicación.
- `notifications`: `SELECT` e `INSERT` para usuarios autenticados; sin `UPDATE` ni `DELETE`.
- Las RPCs se definirán con privilegios mínimos: `SECURITY DEFINER`, `search_path` seguro y `EXECUTE` concedido solo a `authenticated`.

### RPC `create_booking`

En una sola transacción, validará:

1. Usuario autenticado y activo.
2. Fecha incluida en los siete días reservables, tras aplicar el rollover de la temporada en `Europe/Madrid`.
3. Existencia del slot y pertenencia a la temporada de la fecha solicitada.
4. Disponibilidad del slot frente a reservas `active` y `maintenance`.
5. Máximo de tres reservas activas.
6. Máximo de una reserva activa por día.
7. No repetir `slot_id` entre reservas activas.

La concurrencia se garantiza por el índice único parcial. Puede añadirse un bloqueo consultivo por fecha y slot para devolver un error de negocio determinista, pero no sustituye al índice.

### RPC `cancel_booking`

Recibirá `p_booking_id` y, en backend, validará atómicamente:

1. Usuario autenticado.
2. La reserva existe.
3. La reserva pertenece al usuario autenticado.
4. La reserva tiene estado `active`.

Después actualizará exclusivamente su estado a `cancelled_by_user` y devolverá los datos de la reserva cancelada necesarios para la notificación. Una segunda confirmación o un estado no activo no producirá una nueva cancelación.

**Entregable completado:** migración de ajuste aplicada y comprobada en `bbdd.json`. La base existente se conserva; quedan verificadas RLS, `create_booking`, `cancel_booking`, slots, settings y el usuario administrativo `AdminJdH`.

## Fase 2 — Tipos, fechas y servicios

- Definir interfaces estrictas para perfil, slot, reserva, notificación y resultados de RPC.
- Centralizar todos los cálculos de fechas y temporada en una utilidad `Europe/Madrid`.
- Crear servicios para Auth, perfil, configuración, reservas y notificaciones.
- El servicio de reservas expondrá únicamente las RPCs de crear y cancelar; nunca operaciones directas de escritura sobre `bookings`.

**Entregable:** capa de acceso a Supabase tipada, pequeña y sin consultas repartidas por componentes.

## Fase 3 — Estado, autenticación y Realtime

- Implementar los stores oficiales: `authStore`, `profileStore`, `settingsStore`, `reservationsStore` y `notificationsStore`.
- Recuperar sesión, cargar perfil y expulsar al usuario si está deshabilitado.
- Suscribirse a `bookings`, `notifications` y al perfil autenticado. Para las tres tablas se atenderán los eventos documentados `INSERT`, `UPDATE` y `DELETE` cuando apliquen.
- Ante un evento Realtime se recargará el conjunto de datos afectado, sin polling y sin lógica de reconciliación innecesaria.

**Entregable:** sesión persistente, estado único en Pinia y actualización automática de reservas, notificaciones y perfil.

## Fase 4 — Middleware y navegación

- Proteger todas las rutas salvo `/login`.
- Redirigir al inicio de notificaciones tras un login válido.
- Conservar y mostrar el aviso de acceso deshabilitado tras cerrar la sesión.

**Entregable:** rutas protegidas y flujo de autenticación completo.

## Fase 5 — Interfaz conforme a los diseños

- Implementar layout, menú lateral, login, notificaciones, calendario de siete días, mis reservas, cambio de alias y contenido estático.
- Un slot libre crea directamente la reserva mediante RPC; un slot propio abre la modal de confirmación.
- Las dos entradas de cancelación usarán la misma `ConfirmCancelModal` y el mismo método del store.
- Tras una RPC correcta, la app insertará la notificación con el alias actual, fecha y franja devueltos o identificados por el servicio.
- Respetar los diseños: gris para libre, negro para ocupado o mantenimiento y rojo para reserva propia; prioridad móvil.

**Entregable:** todas las pantallas definidas en la documentación, sin funcionalidades fuera de alcance.

## Fase 6 — Verificación

- Comprobar tipo, lint y build de Nuxt.
- Probar reglas de creación: usuario inactivo, fecha fuera de ventana, temporada incorrecta, límite de tres, una reserva diaria, horario repetido, ocupación y concurrencia.
- Probar cancelación: correcta, ID inexistente, reserva ajena, reserva no activa, doble confirmación y liberación del slot.
- Probar RLS: no hay escrituras directas de `bookings`, ni edición de campos protegidos de perfiles.
- Validar Realtime, rollover de verano/invierno y los diseños en móvil, tablet y escritorio.

**Entregable:** aplicación validada para despliegue.

### Estado de la verificación manual

- Usuario deshabilitado: comprobado manualmente con `prueba1@prueba1.com`; la sesión se cierra y el acceso queda bloqueado correctamente.
- Realtime y diseño responsive en navegador: comprobados manualmente de forma satisfactoria.
- Las comprobaciones automatizadas de las RPC, RLS, TypeScript y lint se ejecutaron correctamente.
- Quedan por completar el build limpio y la verificación manual del rollover de verano/invierno antes del despliegue.

## Fase 7 — Pruebas automatizadas

- Incorporar Vitest y el script `npm test` sin sustituir los controles existentes de tipo y lint.
- Crear pruebas unitarias para `utils/dates.ts`: fecha de Madrid, ventana de siete días, temporada y rollover de invierno/verano.
- Crear pruebas unitarias de las validaciones de alias y de los mapeos de errores que se muestran al usuario.
- Probar servicios y stores con el cliente de Supabase simulado: carga, errores, cierre de sesión y actualización del estado.
- Probar los componentes críticos con Vue Test Utils: modal de cancelación, snackbar y estados principales del calendario.
- Mantener las reglas críticas de reservas, RLS y concurrencia en pruebas de integración contra un proyecto Supabase de pruebas aislado; nunca contra datos reales de la comunidad.
- Añadir los scripts de ejecución y la documentación necesaria para que las pruebas se puedan repetir localmente y en integración continua en el futuro.

**Entregable:** suite automatizada reproducible, sin datos reales ni secretos, que cubra la lógica de frontend y los flujos críticos de Supabase en un entorno de pruebas separado.

## Archivos previstos

- `supabase/migrations/<timestamp>_database_adjustments.sql` (solo si la validación detecta ajustes necesarios; nunca para recrear las tablas existentes)
- `nuxt.config.ts`, `package.json` y configuración TypeScript de Nuxt
- `types/`, `utils/`, `services/`, `stores/`, `middleware/`, `layouts/`, `components/` y `pages/`
- Pruebas de RPC, servicios y flujos críticos de reserva/cancelación
- Configuración de Vitest y pruebas unitarias e integración de la Fase 7
