# Jardines de hercules Pista Padel

## 02 - UI & UX

**Versión:** 1.0

Este documento define el comportamiento visual de toda la aplicación.

El objetivo principal es conseguir una aplicación extremadamente sencilla, rápida y fácil de utilizar desde un teléfono móvil.

---

# 1. Filosofía de diseño

La interfaz debe transmitir:

- simplicidad
- limpieza
- rapidez
- confianza

Nunca deberá parecer una aplicación empresarial.

Debe sentirse como una pequeña aplicación creada exclusivamente para la comunidad.

---

# 2. Mobile First

Toda la interfaz se diseña primero para móvil.

Posteriormente se adaptará a tablet y escritorio.

No se crearán pantallas independientes para escritorio.

---

# 3. Estilo visual

Inspiración:

- Material Design
- iOS
- Interfaces minimalistas

Eliminar cualquier elemento decorativo innecesario.

---

# 4. Grid

Todo el diseño utiliza una cuadrícula basada en múltiplos de 4 px.

Espaciados habituales:

- 4 px
- 8 px
- 12 px
- 16 px
- 24 px
- 32 px

Nunca utilizar medidas arbitrarias.

---

# 5. Bordes

Cards

16 px

Botones

8 px

Inputs

8 px

Modales

16 px

---

# 6. Sombras

Muy suaves.

Nunca utilizar sombras agresivas.

El protagonismo debe recaer sobre el color de los botones y de los slots.

---

# 7. Colores

## Color principal

Verde esmeralda.

Se utilizará para:

- cabecera
- botones principales
- enlaces importantes

---

## Gris claro

Representa:

Franja libre.

Debe transmitir disponibilidad.

---

## Negro

Representa:

- ocupado
- mantenimiento

Nunca será clickable.

---

## Rojo

Representa:

Reserva propia.

También se utiliza para:

- botón cancelar
- acciones destructivas

---

## Blanco

Fondo principal de toda la aplicación.

---

# 8. Tipografía

Fuente:

Inter

Pesos recomendados:

- 400
- 500
- 600
- 700

No utilizar más pesos.

---

# 9. Iconografía

Utilizar exclusivamente iconos outline.

Estilo:

Heroicons o Lucide.

Todos los iconos deberán tener el mismo estilo.

---

# 10. Navegación

Toda la aplicación utiliza un Drawer lateral.

No existen pestañas inferiores.

No existen múltiples menús.

---

## Menú

Opciones:

- Notificaciones
- Reservas
- Cambiar alias
- Mis reservas
- Normas de uso
- Acerca de
- Salir

En la parte superior aparece el alias del usuario.

Ejemplo:

JH12B

---

# 11. Pantalla Login

Elementos:

- Logo de la comunidad
- Usuario
- Contraseña
- Botón iniciar sesión
- Recuperar contraseña (este botón lo que hará es abrir el correo electrónico de la persona para enviar un correo a la dirección xxxxxx@gmail.com con el asunto Recuperar contraseña)

Debe ser la pantalla más limpia de toda la aplicación.

---

# 12. Pantalla Reservas

Es la pantalla principal.

Debe ocupar la mayor parte del desarrollo.

Contiene:

- título
- nombre comunidad
- calendario

No existen filtros.

No existen búsquedas.

---

## Calendario

Cada fila representa un día.

Cada columna representa una franja horaria.

Los slots tienen exactamente el mismo tamaño.

---

## Estados

Libre

Gris.

Clickable.

---

Reserva propia

Rojo.

Clickable.

Abre modal cancelar.

---

Ocupado

Negro.

No clickable.

---

Día bloqueado

Todos los slots aparecen ocupados.

---

# 13. Comportamiento de los slots

Al pulsar un slot libre:

- animación rápida
- llamada backend
- actualización realtime
- toast éxito

No existe pantalla de confirmación.

---

# 14. Modal Cancelación

Overlay oscuro con blur.

Card centrada.

Contiene:

- icono
- texto
- botón rojo
- botón verde

Cerrar pulsando:

- Continuar
- fuera del modal

---

# 15. Mis reservas

Lista vertical.

Cada card contiene:

- fecha
- horario
- botón Anular

No existen acciones adicionales.

---

# 16. Cambiar alias

Formulario muy simple.

Elementos:

- explicación
- input
- botón Guardar

Nada más.

---

# 17. Normas

Pantalla únicamente de lectura.

Permitir scroll.

No existen acciones.

El texto se recupera desde la base de datos.

---

# 18. Acerca de

Pantalla muy sencilla.

Contiene únicamente el texto configurado desde la base de datos.

---

# 19. Notificaciones

Lista cronológica.

Orden descendente.

Más recientes arriba.

Cada elemento contiene:

- icono
- texto
- fecha
- hora

No existen filtros.

---

# 20. Estados de carga

Todas las pantallas deberán tener Skeleton.

Nunca mostrar pantalla vacía mientras se carga.

---

# 21. Estados vacíos

Ejemplos:

"No tienes reservas."

"No existen notificaciones."

"No hay normas disponibles."

Siempre acompañados de un icono.

---

# 22. Errores

Los errores se mostrarán mediante Toast.

Nunca mediante alertas del navegador.

---

# 23. Confirmaciones

Solo existe una confirmación en toda la aplicación.

Cancelar una reserva.

Reservar nunca requiere confirmación.

---

# 24. Responsive

Anchura máxima recomendada:

480 px

En escritorio la aplicación permanecerá centrada.

No ocupará toda la pantalla.

La sensación debe ser la de utilizar una aplicación móvil.

---

# 25. Animaciones

Todas las animaciones deberán durar entre:

150 ms

y

250 ms.

Nunca utilizar animaciones largas.

---

# 26. Accesibilidad

Todo elemento clickable deberá tener:

- cursor adecuado
- estados hover
- estados focus
- navegación mediante teclado

---

# 27. Consistencia

Todas las pantallas deberán mantener:

- misma cabecera
- mismos márgenes
- mismos botones
- misma tipografía
- mismo estilo de tarjetas

El usuario nunca debe percibir cambios de estilo entre pantallas.
