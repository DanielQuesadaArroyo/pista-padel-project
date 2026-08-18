# 02 - UI / UX

## Principios de Diseño

- Mobile First.
- Máxima simplicidad.
- Navegación clara.
- Acciones mínimas para reservar.
- Interfaz optimizada para usuarios no técnicos.
- Identidad azul/turquesa luminosa sobre fondo claro.
- Tarjetas blancas, sombras discretas y bordes suaves.

Las referencias visuales vigentes se encuentran en `/docs/redesign`. Las
imágenes anteriores de `/docs/design` dejan de ser la referencia visual activa.

## Sistema visual

- Principal: `#1596A5`.
- Principal oscuro: `#107582`.
- Principal suave: `#E4F5F7`.
- Fondo: `#F8FAFB`.
- Superficie: blanco.
- Texto principal: `#202529`.
- Texto secundario: `#56636A`.
- Peligro: `#C62828`.

Los colores se centralizan en variables CSS compartidas.

---

## Paleta Funcional

### Reservas

- Azul claro: slot libre y reservable.
- Gris: slot expirado y no reservable.
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

- Título de la comunidad.
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
- Nueva reserva con acento azul/turquesa.
- Anulación con acento rojo.
- Sin iconos dentro de las tarjetas.

Si no existen notificaciones:

"No existen notificaciones para los próximos días."

---

## Pantalla Reservas

Características:

- Vista principal de disponibilidad.
- Calendario limitado a 7 días.
- Día actual + 6 días.
- Sin navegación a semanas futuras.
- Tarjeta blanca independiente por día.
- Cabecera de día con icono, día de la semana y fecha.
- Slots en dos columnas en móvil, todos con el mismo ancho.
- Leyenda compacta de estados.

Estados:

- Azul claro → libre y reservable.
- Gris → expirado y no reservable.
- Negro → ocupado o mantenimiento.
- Rojo → reserva propia.

Reserva:

- Pulsar slot azul claro.
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

- Anular reserva, rojo: confirma la cancelación.
- Continuar, azul/turquesa: cierra la modal sin cancelar.

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

"No tienes reservas. Cuando realices una reserva, aparecerá aquí."

No se muestran contadores, barras de progreso ni información redundante.

---

## Pantalla Cambiar Alias

Elementos:

- Campo alias.
- Ayuda "Máximo 20 caracteres".
- Botón Guardar alias.
- El campo comienza vacío y no muestra el alias actual.

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

Mantiene exclusivamente el contenido estático existente, sin contacto,
versiones ni secciones nuevas.

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

## Cabecera autenticada

Todas las páginas autenticadas comparten cabecera blanca con botón de menú,
nombre de pantalla y subtítulo `Pista de Pádel`. No incluye avatar ni acciones
adicionales.

## Menú lateral

Se desliza desde la izquierda sobre un overlay y muestra alias dinámico,
comunidad y `Pista de Pádel`. La ruta activa usa fondo azul muy claro. `Salir`
se presenta en rojo y separado del resto.
