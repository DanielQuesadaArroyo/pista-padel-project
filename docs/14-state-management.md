# 14 - State Management

## Objetivo

Este documento define la estrategia de gestión de estado de la aplicación Jardines de Hércules II - Pista de Pádel.

La solución debe ser simple, fácil de mantener y adecuada para una comunidad con pocos usuarios concurrentes.

---

# Principio General

Se utilizará la solución más sencilla posible.

No se implementarán sistemas complejos de gestión de estado.

---

# Tecnología

## Permitido

- Vue Composables
- Nuxt State
- Pinia

## Decisión

Se utilizará:

```text
Pinia
```

como store global de la aplicación.

---

# Stores

## authStore

Gestiona la sesión del usuario.

### Información almacenada

```text
userId
email
isAuthenticated
```

### Responsabilidades

- Login.
- Logout.
- Estado autenticado.
- Persistencia de sesión.

---

## profileStore

Gestiona la información del perfil.

### Información almacenada

```text
alias
staircase
floor
door
active
```

### Responsabilidades

- Cargar perfil.
- Actualizar alias.
- Detectar usuario deshabilitado.

---

## settingsStore

Gestiona la configuración global.

### Información almacenada

```text
summerStart
summerEnd
```

### Responsabilidades

- Determinar temporada activa.
- Configuración global.

---

## reservationsStore

Gestiona las reservas.

### Información almacenada

```text
calendarReservations
myReservations
```

### Responsabilidades

- Cargar reservas visibles.
- Cargar reservas propias.
- Crear reservas.
- Cancelar reservas.
- Actualización Realtime.

---

## notificationsStore

Gestiona las notificaciones.

### Información almacenada

```text
notifications
```

### Responsabilidades

- Obtener notificaciones.
- Actualización Realtime.

---

# Datos No Persistentes

No es necesario almacenar globalmente:

- Estados de modales.
- Formularios temporales.
- Indicadores visuales.
- Filtros temporales.

Estos estados vivirán dentro de cada componente.

---

# Persistencia

## Sesión

La persistencia de autenticación será gestionada por:

```text
Supabase Auth
```

---

## Stores

No se utilizará persistencia local adicional.

No se almacenará información de negocio en:

```text
localStorage
sessionStorage
```

salvo lo que gestione internamente Supabase.

---

# Carga Inicial

## Flujo

```text
Aplicación
↓
Recuperar sesión Supabase
↓
Cargar perfil
↓
Cargar settings
↓
Abrir Notificaciones
```

---

# Realtime

## Bookings

Cuando cambie:

```text
bookings
```

Actualizar:

```text
calendarReservations
myReservations
```

---

## Notifications

Cuando cambie:

```text
notifications
```

Actualizar:

```text
notifications
```

---

## Profiles

Cuando cambie:

```text
profiles
```

Actualizar:

```text
profileStore
```

Si:

```text
active = false
```

ejecutar:

```text
logout
```

---

# Mutaciones

## Crear reserva

```text
Crear reserva
↓
Actualizar store
↓
Actualizar interfaz
```

---

## Cancelar reserva

```text
Llamar RPC cancel_booking()
↓
Cancelar reserva correctamente
↓
Actualizar store
↓
Actualizar interfaz
```

---

## Cambiar alias

```text
Actualizar alias
↓
Actualizar profileStore
↓
Actualizar interfaz
```

---

# Datos Derivados

## Temporada activa

Calculada a partir de:

```text
settings
fecha actual
```

Resultado:

```text
summer
winter
```

---

## Slots visibles

Calculados a partir de:

```text
temporada activa
slots
```

---

## Días visibles

Calculados dinámicamente:

```text
día actual + 6 días
```

---

# Principios de Implementación

## Single Source of Truth

Cada dato tendrá una única fuente de verdad.

Ejemplos:

```text
Perfil → profileStore
Reservas → reservationsStore
Notificaciones → notificationsStore
```

---

## Evitar Duplicidad

No duplicar información entre stores.

---

## Simplicidad

Si un dato solo se utiliza en un componente:

```text
No crear store.
```

Mantenerlo local.

---

# Tecnologías No Permitidas

No utilizar:

- Vuex.
- Redux.
- Zustand.
- MobX.
- Event Bus.
- WebSockets personalizados.

---

# Objetivo Final

Mantener una gestión de estado:

- Simple.
- Tipada.
- Fácil de mantener.
- Adecuada para el tamaño real de la comunidad.
