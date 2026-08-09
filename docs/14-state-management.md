# Jardines de hercules Pista Padel

## 14 - State Management

**Versión:** 1.0

Este documento define cómo gestionar el estado de la aplicación utilizando Pinia y Vue.

---

# 1. Objetivo

Separar claramente:

- Estado global.
- Estado local.
- Datos persistidos.
- Datos calculados.

---

# 2. Principios

- Pinia solo almacenará estado compartido.
- Los componentes serán lo más "tontos" posible.
- Toda la lógica de negocio residirá en composables y backend.

---

# 3. Stores

## authStore

Responsabilidad:

- Usuario autenticado.
- Perfil.
- Estado de autenticación.

Nunca almacenar contraseñas.

---

## bookingStore

Responsabilidad:

- Reservas visibles.
- Calendario.
- Días bloqueados.
- Temporada.

No guardar datos históricos.

---

## notificationStore

Responsabilidad:

- Notificaciones cargadas.
- Estado de lectura (si se implementa en el futuro).

---

## settingsStore

Responsabilidad:

- Normas.
- Acerca de.
- Configuración general.

---

# 4. Estado local

Cada componente mantendrá únicamente:

- Modales abiertos.
- Inputs.
- Loading.
- Errores locales.

Nunca almacenar datos globales.

---

# 5. Datos obtenidos de Supabase

Siempre se consideran la fuente de verdad.

Nunca asumir que el estado local es correcto.

Tras cualquier operación importante:

- confiar en Realtime.

---

# 6. Datos calculados

Utilizar propiedades computadas para:

- Número de reservas activas.
- Reservas del día.
- Slots libres.
- Slots propios.
- Slots ocupados.

No persistir estos datos.

---

# 7. Flujo de actualización

Usuario

↓

Acción

↓

Backend

↓

Base de datos

↓

Realtime

↓

Store

↓

Componentes

Nunca actualizar el estado manualmente antes de que el backend confirme la operación.

---

# 8. Persistencia

Persistir únicamente:

- Sesión de Supabase.

No persistir:

- Calendario.
- Reservas.
- Notificaciones.

Siempre recargar desde backend.

---

# 9. Errores

Cada store deberá exponer:

- loading
- error

Nunca lanzar errores sin controlar.

---

# 10. Checklist

- Estado mínimo.
- Sin duplicidad.
- Backend como fuente de verdad.
- Pinia solo para estado compartido.
- Datos derivados mediante computed.
