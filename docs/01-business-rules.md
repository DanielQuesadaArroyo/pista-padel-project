# Jardines de hercules Pista Padel

## 01 - Business Rules

**Versión:** 1.0

Este documento define todas las reglas de negocio de la aplicación.

Estas reglas tienen prioridad sobre cualquier implementación técnica.

**Todas las validaciones deberán realizarse en el backend.**

---

# 1. Viviendas

La comunidad está formada por aproximadamente **220 viviendas**.

Cada vivienda puede disponer de **un único usuario**.

No está permitido que una misma vivienda tenga varias cuentas.

La vivienda queda identificada por:

- Escalera
- Piso
- Puerta

Debe existir una restricción de unicidad sobre estos tres campos.

---

# 2. Solicitud de acceso

No existe registro libre ni tampoco pantalla de registro en la aplicación.

El flujo será:

1. El vecino solicita acceso a través de un correo electronico.
2. En el correo electrónico indicará:
   - Escalera
   - Piso
   - Puerta
3. La solicitud queda pendiente.
4. El administrador crea el usuario desde la base de datos.

Es por ello que el registro queda fuera del ambito de la aplicación. Se crea directamente en la base de datos de forma manual.

---

# 3. Alias

El usuario podrá modificar posteriormente su alias a través de la pantalla de cambio de alias.

El alias debe ser único.

---

# 4. Estado del usuario

Cada usuario tiene un estado.

Estados permitidos:

- active
- disabled

---

## Usuario activo

Puede utilizar toda la aplicación.

---

## Usuario deshabilitado

No puede:

- iniciar sesión
- reservar
- cancelar reservas

---

# 5. Pista

La aplicación gestiona **una única pista de pádel**.

No existe soporte para:

- varias pistas
- pistas simultáneas

Toda la lógica se desarrolla sobre una única pista.

---

# 6. Ventana de reservas

Solo podrán visualizarse el día actual y los próximos **6 días**. En total apareceran 7 días.

No podrán visualizarse fechas posteriores.

---

# 7. Día actual

Se puede reservar el mismo día si la hora de inicio de la pista aún no ha pasado. Por ejemplo:

- no se podrá reservar si la hora de la reserva es de 10:00 a 11:30 horas y son las 10:01 horas. Esa franja horaria queda bloqueada.
- se puede reservar si la reserva es de 11:30 a 13:00 horas y son las 11:29.

---

# 8. Ventana de reservas y límite de reservas activas

La aplicación mostrará siempre una ventana móvil de **7 días naturales**, compuesta por:

- El día actual.
- Los 6 días naturales siguientes.

Ejemplo:

Si hoy es martes 10, el calendario mostrará:

- Martes 10
- Miércoles 11
- Jueves 12
- Viernes 13
- Sábado 14
- Domingo 15
- Lunes 16

No se mostrarán fechas posteriores a esta ventana.

---

## Reserva del día actual

El día actual será visible, pero únicamente podrán reservarse las franjas horarias que todavía no hayan comenzado.

Ejemplo:

Si son las **18:15**, ya no podrán reservarse:

- 10:00–11:30
- 11:30–13:00
- 13:00–14:30
- 17:00–18:00
- 18:00–19:00 _(ya iniciada)_

Sí podrán reservarse:

- 19:00–20:30
- 20:30–22:00

---

## Límite de reservas

Cada usuario podrá tener un máximo de **3 reservas activas** dentro de la ventana visible de 7 días.

No podrá realizar una nueva reserva mientras ya tenga 3 reservas activas dentro de dicha ventana.

Cuando una reserva deje de pertenecer a la ventana visible, dejará de contabilizar para este límite.

---

## Diversidad horaria

Las 3 reservas activas deberán realizarse en franjas horarias distintas.
No se puede repetir la misma franja horaria dentro de la ventana visible de 7 días.

Ejemplo permitido:

- Martes 18:00
- Jueves 19:00
- Domingo 20:30

Ejemplo NO permitido:

- Martes 19:00
- Jueves 19:00
- Lunes 19:00

## El objetivo es repartir equitativamente las franjas más demandadas.

## Actualización automática del calendario

La ventana de reservas no cambia a las 00:00.

Se actualizará automáticamente cuando finalice completamente la jornada deportiva.

### Horario de invierno

La actualización se realizará todos los días a las **22:01**.

### Horario de verano

La actualización se realizará todos los días a las **23:01**.

En ese momento:

- desaparecerá el día actual,
- aparecerá un nuevo día al final del calendario,
- las reservas que hayan salido de la ventana dejarán de contabilizar para el límite de 3 reservas activas.

Este proceso deberá realizarse automáticamente sin intervención del usuario.

---

# 9. Límite diario

Solo puede existir una reserva por usuario y día.

Ejemplo válido:

Lunes 18:00

Martes 19:00

Miércoles 20:00

Ejemplo NO válido:

Lunes 10:00

Lunes 19:00

---

---

# 10. Horarios oficiales

## Invierno

- 10:00–11:30
- 11:30–13:00
- 13:00–14:30
- 17:00–18:00
- 18:00–19:00
- 19:00–20:30
- 20:30–22:00

---

## Verano

- 10:00–11:30
- 11:30–13:00
- 13:00–14:30
- 18:00–19:00
- 19:00–20:00
- 20:00–21:30
- 21:30–23:00

---

Los horarios son fijos.

No existen franjas dinámicas.

Solo podrán existir reservas en estas franjas.

---

# 11. Temporada

Existen dos temporadas.

- Invierno
- Verano

La temporada activa se define desde la base de datos.

Todos los usuarios utilizan siempre la misma temporada.

---

# 12. Reserva

Una reserva se realiza pulsando directamente sobre una franja libre.

No existe pantalla de confirmación.

La reserva debe realizarse inmediatamente.

---

# 13. Cancelación

La cancelación requiere confirmación.

Solo podrá cancelarse hasta **5 minutos antes** del inicio.

Una vez superado ese tiempo:

La reserva ya no podrá cancelarse.

---

# 14. Disponibilidad

Un horario puede encontrarse en uno de estos estados.

## Libre

Color gris.

Puede reservarse.

---

## Ocupado

Color negro.

No puede seleccionarse.

---

## Reserva propia

Color rojo.

Al pulsarlo se abre el diálogo de cancelación.

---

## Día bloqueado

Todos los horarios aparecerán ocupados.

No podrán realizarse reservas.

---

# 15. Mantenimiento

El administrador puede bloquear:

- un día
- varios días consecutivos

Mientras un día permanezca bloqueado:

- nadie podrá reservar
- nadie podrá cancelar reservas de ese día

---

# 16. Concurrencia

Nunca podrán existir dos reservas para el mismo horario.

Si dos usuarios reservan simultáneamente:

- el primero obtiene la reserva
- el segundo recibe un error indicando que la franja ya no está disponible

---

# 17. Privacidad

Los vecinos conocerán quién el álias de quien ha reservado una pista sólo en la pantalla de notificaciones.

En el calendario únicamente se visualizarán colores.

Nunca se mostrará:

- nombre
- alias
- email
- vivienda

---

# 18. Realtime

Todas las reservas deberán actualizarse automáticamente.

No será necesario refrescar la página.

El cambio deberá reflejarse en todos los dispositivos conectados.

---

# 19. Notificaciones

Cada usuario recibirá un recordatorio el mismo día de su reserva.

Hora de envío:

09:00

Ejemplo:

> Hoy tienes una reserva de pista a las 19:00.

---

# 20. Normas

Las normas de uso son editables desde la base de datos.

No requieren desplegar una nueva versión de la aplicación.

---

# 21. Acerca de

El contenido de la pantalla "Acerca de" también será editable desde la base de datos.

---

# 22. Acciones NO permitidas

No está permitido:

- editar reservas
- crear reservas manuales
- modificar reservas de otros usuarios
- superar el límite semanal
- tener dos reservas el mismo día
- repetir horario dentro de los días mostrados en el calendario
- reservar un día bloqueado
- crear varios usuarios para una misma vivienda

---

# 23. Fuente de verdad

Las reglas definidas en este documento representan la lógica oficial del negocio.

El frontend únicamente mostrará la información al usuario.

Todas las decisiones deberán validarse siempre en el backend antes de guardar cualquier dato.
