# 09 - Components

## Objetivo

Este documento define los componentes reutilizables de la aplicación Jardines de Hércules II - Pista de Pádel.

Las referencias visuales oficiales se encuentran en:

```text
/docs/redesign
```

---

# Component: SideMenu

## Referencia

```text
Menu.png
```

## Descripción

Menú lateral principal de navegación.

## Opciones

- Notificaciones
- Reservas
- Mis reservas
- Cambiar alias
- Normas de uso
- Acerca de
- Salir

La cabecera muestra el alias reactivo de `profileStore`. Las opciones usan una
única familia Lucide: `bell`, `calendar-days`, `calendar-check`, `user-cog`,
`file-text`, `info` y `log-out`, en ese orden.

Se abre con overlay y animación desde la izquierda. Incluye botón de cierre,
contexto de la comunidad, estado activo azul suave y Salir en rojo. No incluye
avatar, monograma ni ilustraciones.

## Disponibilidad

Visible en todas las páginas autenticadas.

---

# Component: AppHeader

Cabecera blanca reutilizable de las páginas autenticadas. Muestra únicamente
botón hamburguesa, nombre de pantalla y `Pista de Pádel`.

---

# Component: NotificationList

## Referencia

```text
Notificaciones.png
```

## Descripción

Listado de notificaciones compartidas para toda la comunidad.

## Características

- Orden descendente.
- Más recientes primero.
- Scroll vertical.
- Actualización Realtime.

## Estado vacío

```text
No existen notificaciones para los próximos días.
```

---

# Component: ReservationCalendar

## Referencias

```text
Calendario.png
```

## Descripción

Componente principal para visualizar y gestionar reservas.

## Características

- 7 días visibles.
- Día actual + 6 días.
- Horarios dinámicos según temporada.
- Actualización Realtime.
- Cabecera compacta con fecha completa en una sola línea.
- Cards expandidas por defecto y colapsables de forma independiente.

---

# Component: ReservationSlot

## Descripción

Representa una franja horaria individual.

## Estados

### Libre

Color azul claro cuando está libre y reservable. Color gris con texto negro
cuando ha expirado. La expiración temporal prevalece sobre una reserva que aún
llegue con estado `active`.

Los slots tienen una altura aproximada de 44 px y se distribuyen por
`ReservationCalendar` en móvil como 3 + 2 + 2: tres columnas iguales para la
mañana y dos columnas iguales en cada una de las dos filas posteriores. La
distribución conserva los siete horarios existentes de la temporada activa y
la pausa visual entre mañana y tarde.

Acción:

```text
Reservar
```

---

### Ocupado

Color:

```text
Negro
```

Acción:

```text
Ninguna
```

---

### Mantenimiento

Color:

```text
Negro
```

Acción:

```text
Ninguna
```

---

### Reserva propia

Color:

```text
Rojo
```

Acción:

```text
Abrir modal cancelar
```

---

# Component: MyReservationsList

## Referencia

```text
My-reservations.png
```

## Descripción

Listado de reservas activas del usuario.

Usa tarjetas con fecha, horario, pista y botón rojo delineado. No muestra
contadores ni barras de progreso.

## Características

- Solo reservas activas.
- Orden ascendente.
- La más próxima primero.

## Estado vacío

```text
No tienes reservas. Cuando realices una reserva, aparecerá aquí.
```

---

# Component: AliasForm

## Referencia

```text
Cambio-alias.png
```

## Descripción

Formulario de modificación de alias.

El campo comienza vacío y no expone el alias actual. Incluye ayuda de máximo
20 caracteres y validación contextual.

## Elementos

- Campo alias.
- Botón Guardar alias.

## Validaciones

- Obligatorio.
- Entre 3 y 20 caracteres.
- Único.
- Alias reservado no permitido.
- Comparación case-insensitive.

---

# Component: ConfirmCancelModal

## Referencia

```text
Modal-Cancelar.png
```

## Descripción

Modal de confirmación de cancelación de reserva.

## Texto

```text
¿Está seguro de que desea cancelar esta reserva?
```

## Botones

### Confirmar

Cancela la reserva.

### Cancelar

Cierra la modal.

---

# Component: LoginForm

## Referencia

```text
Login.png
```

## Descripción

Formulario de autenticación.

## Elementos

- Email.
- Contraseña.
- Botón Iniciar sesión.
- Enlace recuperación.

---

# Component: ForgotPasswordModal

## Descripción

Mensaje informativo mostrado desde Login.

## Texto

```text
Contacte con el presidente de la comunidad para recuperar su acceso.
```

---

# Component: StaticContentView

## Referencias

```text
Normas-Uso.png
Acerca-de.png
```

## Descripción

Componente reutilizable para mostrar contenido estático.

## Uso

- Normas de uso.
- Acerca de.

## Fuente de datos

```text
JSON
TypeScript
```

---

# Component: ToastMessage

## Descripción

Mensajes breves mostrados al usuario.

## Casos de uso

- Alias actualizado.
- Reserva creada.
- Reserva cancelada.
- Error de validación.
- Máximo de reservas alcanzado.

---

# Component: LoadingIndicator

## Descripción

Indicador de carga.

## Uso

- Inicio de sesión.
- Obtención de reservas.
- Obtención de notificaciones.
- Cambio de alias.

---

# Componentes No Necesarios

No se implementarán componentes para:

- Administración.
- Gestión de usuarios.
- Estadísticas.
- Históricos.
- Incidencias.
- Sanciones.
- Chat.
- Notificaciones push.
