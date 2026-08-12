# 09 - Components

## Objetivo

Este documento define los componentes reutilizables de la aplicación Jardines de Hércules II - Pista de Pádel.

Las referencias visuales oficiales se encuentran en:

```text
/Docs/design
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

## Disponibilidad

Visible en todas las páginas autenticadas.

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
Calendario-full.png
```

## Descripción

Componente principal para visualizar y gestionar reservas.

## Características

- 7 días visibles.
- Día actual + 6 días.
- Horarios dinámicos según temporada.
- Actualización Realtime.

---

# Component: ReservationSlot

## Descripción

Representa una franja horaria individual.

## Estados

### Libre

Color:

```text
Gris
```

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
My-reservas.png
```

## Descripción

Listado de reservas activas del usuario.

## Características

- Solo reservas activas.
- Orden ascendente.
- La más próxima primero.

## Estado vacío

```text
No dispone de reservas activas.
```

---

# Component: AliasForm

## Referencia

```text
Cambio-Alias.png
```

## Descripción

Formulario de modificación de alias.

## Elementos

- Campo alias.
- Botón Guardar.

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
