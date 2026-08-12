# 02 - UI / UX

## Principios de Diseño

- Mobile First.
- Máxima simplicidad.
- Navegación clara.
- Acciones mínimas para reservar.
- Interfaz optimizada para usuarios no técnicos.

---

## Paleta Funcional

### Reservas

- Gris: slot libre.
- Negro: slot no disponible (ocupado o mantenimiento).
- Rojo: reserva propia.

No se mostrarán alias de otros vecinos en el calendario.

---

## Navegación Principal

El menú lateral mostrará:

1. Notificaciones
2. Reservas
3. Mis reservas
4. Cambiar alias
5. Normas de uso
6. Acerca de
7. Salir

---

## Pantalla Login

Elementos:

- Logo / título de la comunidad.
- Campo email.
- Campo contraseña.
- Botón Iniciar sesión.
- Enlace "¿Olvidaste tu contraseña?"

Comportamiento:

- No existe recuperación automática.
- Al pulsar el enlace se mostrará un mensaje indicando que contacte con el presidente.

---

## Pantalla Notificaciones

Características:

- Pantalla principal de la aplicación.
- Lista cronológica.
- Más recientes primero.
- Sin estados leído/no leído.
- Scroll vertical.

Si no existen notificaciones:

"No existen notificaciones para los próximos días."

---

## Pantalla Reservas

Características:

- Vista principal de disponibilidad.
- Calendario limitado a 7 días.
- Día actual + 6 días.
- Sin navegación a semanas futuras.

Estados:

- Gris → libre.
- Negro → ocupado o mantenimiento.
- Rojo → reserva propia.

Reserva:

- Pulsar slot gris.
- Reserva inmediata.
- Sin confirmación previa.

Errores:

- Máximo 3 reservas activas.
- Máximo 1 reserva por día.
- Horario repetido.

Los mensajes se mostrarán mediante modal o aviso visual.

---

## Modal Cancelar Reserva

Texto:

¿Está seguro de que desea cancelar esta reserva?

Botones:

- Confirmar
- Cancelar

---

## Pantalla Mis Reservas

Características:

- Solo reservas activas.
- Orden ascendente.
- La más próxima primero.

Cada reserva permite:

- Pulsar sobre ella.
- Mostrar modal de cancelación.

Estado vacío:

"No dispone de reservas activas."

---

## Pantalla Cambiar Alias

Elementos:

- Campo alias.
- Botón Guardar.

Validaciones:

- Entre 3 y 20 caracteres.
- Obligatorio.
- Único.
- Sin distinguir mayúsculas/minúsculas.
- Alias reservados bloqueados.

El botón Guardar permanecerá deshabilitado mientras los datos no sean válidos.

---

## Pantalla Normas de Uso

Contenido estático.

Scroll vertical.

Diseño de lectura simple.

---

## Pantalla Acerca de

Contenido estático.

Información sobre:

- Comunidad.
- Aplicación.
- Versión.

Scroll vertical.

---

## Responsive

La aplicación está diseñada prioritariamente para móviles.

Debe funcionar correctamente en:

- Android.
- iPhone.
- Tablets.
- Navegadores de escritorio.

No se requieren diseños específicos para escritorio.
