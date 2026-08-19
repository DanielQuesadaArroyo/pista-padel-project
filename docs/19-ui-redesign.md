# 19 - UI Redesign

## Objetivo

Este documento define el rediseño visual definitivo de la aplicación **Jardines de Hércules II - Pista de Pádel**.

La aplicación ya está funcionalmente implementada y probada. Este trabajo es exclusivamente una **capa de rediseño visual y de presentación**.

No deben modificarse reglas de negocio, flujos funcionales, lógica de reservas, validaciones backend, RPC, RLS, Supabase, stores ni comportamiento existente salvo cuando sea estrictamente necesario para aplicar el nuevo diseño.

Las referencias visuales oficiales de esta nueva versión estarán en:

```text
/docs/redesign
```

Codex debe revisar esas imágenes antes de modificar la interfaz.

---

# 1. Principios generales

El objetivo del rediseño es:

- Mantener una UX extremadamente sencilla.
- Mantener los flujos actuales para que los vecinos no tengan que reaprender la aplicación.
- Eliminar la identidad visual verde anterior.
- Crear una identidad propia para Jardines de Hércules II.
- Mantener un estilo limpio, moderno, ligero y Mobile First.
- Evitar elementos decorativos que no aporten funcionalidad.
- Evitar añadir información redundante.
- Evitar añadir nuevas funcionalidades bajo la excusa del rediseño.

No introducir:

- Menú inferior.
- Navegación inferior fija.
- Ilustraciones decorativas de pistas.
- Avatares.
- Iniciales del usuario en círculos.
- Contadores de reservas tipo `2/3`.
- Barras de progreso.
- Información redundante.
- Nuevas secciones informativas no definidas en este documento.

---

# 2. Identidad visual

## Color principal

Eliminar completamente el verde como color corporativo principal.

Usar una identidad basada en azul/turquesa luminoso.

Paleta orientativa:

```css
--color-primary: #1596A5;
--color-primary-dark: #107582;
--color-primary-soft: #E4F5F7;

--color-background: #F8FAFB;
--color-surface: #FFFFFF;

--color-text-primary: #202529;
--color-text-secondary: #56636A;

--color-slot-available: #CDEFF4;
--color-slot-expired: #D1D5D8;
--color-slot-occupied: #292D2F;
--color-slot-mine: #C62828;

--color-danger: #C62828;
```

La implementación puede ajustar ligeramente estos valores para igualar las referencias visuales, pero debe mantener esta familia cromática.

## Tokens

Centralizar los colores en variables CSS, tokens o constantes reutilizables.

Evitar valores duplicados o hardcodeados individualmente en múltiples componentes.

---

# 3. Tipografía y estilo general

Mantener una tipografía sans-serif limpia y moderna.

Características:

- Títulos principales grandes y con peso alto.
- Subtítulos en gris azulado.
- Texto normal oscuro.
- Fondo general muy claro.
- Tarjetas blancas.
- Bordes suaves.
- Sombras muy discretas.
- Radios de borde moderados.
- Espaciado amplio y consistente.
- Iconografía lineal y limpia.

No utilizar sombras fuertes ni efectos visuales innecesarios.

---

# 4. Cabecera global de páginas autenticadas

Las páginas autenticadas deberán compartir una cabecera coherente.

Estructura:

```text
☰   Nombre de pantalla
    Pista de Pádel
```

Características:

- Fondo blanco.
- Icono hamburguesa en color principal.
- Nombre de la pantalla en color principal.
- Subtítulo `Pista de Pádel`.
- Línea inferior o separación muy sutil.
- Sin avatar a la derecha.
- Sin iniciales del usuario a la derecha.
- Sin acciones adicionales.

---

# 5. Menú lateral

## Comportamiento

Se abre desde el icono hamburguesa.

Al abrir:

- Se desliza desde la izquierda.
- El contenido restante queda oscurecido mediante overlay.
- Se cierra al pulsar fuera.
- Puede incluir botón `X` de cierre.

No incluir ilustraciones en la parte inferior.

## Cabecera del menú

Mostrar únicamente:

```text
<alias actual del usuario>
Jardines de Hércules Fase II
Pista de Pádel
```

Ejemplo:

```text
JH32B
Jardines de Hércules Fase II
Pista de Pádel
```

El alias debe ser dinámico.

No mostrar:

- Iniciales dentro de círculos.
- Avatar.
- Alias duplicado.
- Monograma `JH`.
- Ilustraciones.

## Opciones

Orden exacto:

1. Notificaciones
2. Reservas
3. Mis reservas
4. Cambiar alias
5. Normas de uso
6. Acerca de
7. Salir

## Iconos

Usar iconos vectoriales consistentes.

Correspondencia:

```text
Notificaciones -> bell
Reservas       -> calendar-days
Mis reservas   -> calendar-check
Cambiar alias  -> user-cog
Normas de uso  -> file-text
Acerca de      -> info
Salir          -> log-out
```

Todos con el mismo estilo visual.

## Estado activo

La opción activa puede utilizar:

- Fondo azul/turquesa muy claro.
- Texto en color principal.
- Icono en color principal.

## Salir

Mostrar:

- Icono rojo.
- Texto rojo.

Separado visualmente del resto mediante una línea o espacio.

---

# 6. Pantalla Reservas

Referencia principal dentro de:

```text
/docs/redesign
```

## Cabecera

```text
Reservas
Pista de Pádel
```

## Contenido

Título:

```text
Disponibilidad
```

Subtítulo:

```text
Jardines de Hércules Fase II
```

## Tarjeta por día

Cada día debe mostrarse dentro de una tarjeta blanca independiente.

Cabecera de la tarjeta:

- Icono de calendario en círculo/fondo azul muy claro.
- Día de la semana y fecha completa en una única línea.
- Chevron que refleja el estado expandido o colapsado.
- Padding vertical reducido para mantener la tarjeta compacta.

Ejemplo:

```text
Domingo, 16 de agosto de 2026
```

Todas las tarjetas comienzan expandidas. Al pulsar la cabecera o el chevron se
ocultan o muestran completamente sus slots. El estado es independiente por día:
no existe comportamiento accordion.

## Distribución de slots en móvil

Para verano:

```text
Fila 1 (mañana):
10:00-11:30 | 11:30-13:00 | 13:00-14:30

Fila 2 (tarde):
18:00-19:00 | 19:00-20:00

Fila 3 (noche):
20:00-21:30 | 21:30-23:00
```

Reglas:

- Los tres slots de la primera fila deben tener el mismo ancho entre ellos.
- Los dos slots de cada fila posterior deben tener el mismo ancho entre ellos.
- En móvil usar la distribución 3 + 2 + 2 sin wrap de los horarios.
- La separación entre la primera y la segunda fila representa la pausa entre mañana y tarde.
- Los slots tendrán una altura aproximada de 44-48 px y espacios verticales reducidos, manteniendo una superficie táctil cómoda.
- La card expandida tendrá una altura orientativa de 190-210 px cuando el ancho disponible lo permita.
- En escritorio/tablet se puede adaptar de forma responsive respetando la lógica visual.

Aplicar la distribución equivalente a los slots de invierno.

## Estados visuales

### Disponible

- Fondo azul claro.
- Texto azul oscuro/negro.
- Reservable.

### Expirado

- Fondo gris.
- Texto negro.
- No interactivo.

### Ocupado

- Fondo negro/antracita.
- Texto blanco.
- No interactivo.

### Mantenimiento

- Igual que ocupado.
- Fondo negro/antracita.
- Texto blanco.
- No interactivo.

### Mi reserva

- Fondo rojo.
- Texto blanco.
- Abre modal de cancelación.

## Leyenda

Mostrar una leyenda simple y compacta:

```text
Disponible
No disponible (pasado)
Ocupada
Mi reserva
```

## Prohibiciones

No añadir:

- Menú inferior.
- Bottom navigation.
- Avatar arriba a la derecha.
- Texto informativo adicional.
- Indicadores de número de reservas.
- Mensajes del tipo "No se puede reservar el mismo día".

---

# 7. Pantalla Notificaciones

La estructura actual se mantiene casi por completo.

## Cabecera

```text
Notificaciones
Pista de Pádel
```

## Contenido

Título:

```text
Notificaciones
```

Subtítulo:

```text
Mantente al día con la actividad de la pista.
```

## Tarjetas

Mantener:

- Tarjeta blanca.
- Fecha/hora arriba a la derecha.
- Título de notificación.
- Mensaje debajo.
- Línea vertical izquierda.

### Nueva reserva

- Línea izquierda azul/turquesa.
- Título en azul/turquesa.
- Texto normal oscuro.

### Anulación

- Línea izquierda roja.
- Título rojo.
- Texto normal oscuro.

No añadir iconos dentro de las tarjetas.

---

# 8. Pantalla Mis reservas

## Cabecera

```text
Mis reservas
Pista de Pádel
```

## Título

```text
Mis reservas
```

## Subtítulo

```text
Aquí puedes ver tus próximas reservas
y cancelarlas si lo necesitas.
```

## Con reservas

Mostrar únicamente las reservas existentes.

Cada reserva dentro de una tarjeta blanca.

Contenido:

- Día de la semana.
- Día.
- Mes y año.
- Hora.
- `Pista de Pádel`.
- Botón `Cancelar reserva`.

No mostrar:

- `2/3 reservas`.
- Barras de progreso.
- Número de reservas disponibles.
- Alias.
- Información extra.
- Bloques informativos al final.

## Sin reservas

Solo cuando no exista ninguna reserva activa:

```text
No tienes reservas

Cuando realices una reserva,
aparecerá aquí.
```

Puede incluir un icono de calendario como apoyo visual.

---

# 9. Pantalla Cambiar alias

Esta pantalla debe mantenerse extremadamente simple.

## Cabecera

```text
Cambiar alias
Pista de Pádel
```

## Contenido

Título:

```text
Cambiar alias
```

Descripción:

```text
Tu alias es el nombre con el que apareces en la
aplicación y en las notificaciones.
```

Formulario:

```text
Nuevo alias

[ Introduce tu nuevo alias ]

Máximo 20 caracteres.

[ Guardar alias ]
```

No mostrar el alias actual.

No añadir:

- Normas para el alias.
- Listado de validaciones.
- Nota importante.
- Tarjetas informativas.
- Información redundante.

Las validaciones existentes deben seguir funcionando y mostrarse únicamente cuando corresponda.

---

# 10. Pantalla Normas de uso

La estructura funcional y el contenido actual se mantienen.

Solo adaptar identidad visual.

## Cabecera

```text
Normas de uso
Pista de Pádel
```

## Contenido

Título:

```text
Normas de uso
```

Subtítulo:

```text
Reglamento interno para el uso de las instalaciones.
```

Mantener:

- Una tarjeta por norma.
- Título de cada norma.
- Texto actual.
- Orden actual.
- Check al inicio de cada bloque.
- Scroll vertical.

Cambiar únicamente:

- Verde -> azul/turquesa.
- Tarjetas blancas.
- Fondo claro.
- Bordes y sombras según el nuevo sistema visual.

No inventar nuevas normas ni reescribir el contenido funcional.

---

# 11. Pantalla Acerca de

Mantener el contenido y estructura actuales.

El objetivo es solo adaptar colores y estilo global.

## Cabecera

```text
Acerca de
Pista de Pádel
```

Aplicar únicamente:

- Color principal nuevo.
- Fondo claro.
- Tarjetas blancas.
- Tipografía y espaciado coherentes.
- Bordes/sombras del nuevo sistema.

No inventar:

- Nuevas secciones.
- Datos de contacto no existentes.
- Emails.
- Versiones.
- Copyright.
- Información adicional no presente actualmente.

La referencia visual solo define estilo, no contenido nuevo.

---

# 12. Pantalla Login

Mantener exactamente la estructura actual.

Solo cambiar identidad visual.

Contenido:

```text
Jardines de
Hércules II

Bienvenido de nuevo

Ingresa a tu cuenta de comunidad

USUARIO
[ campo ]

CONTRASEÑA
[ campo ]

[ Iniciar sesión ]

¿Olvidaste tu contraseña?

Acceso exclusivo para miembros registrados de Jardines de
Hércules Fase II.
```

Cambios:

- Sustituir verde por azul/turquesa.
- Botón principal azul/turquesa.
- Labels azul/turquesa.
- Enlace azul/turquesa.
- Mantener fondo claro.
- Mantener tarjeta/formulario actual.
- Mantener distribución actual.

No añadir:

- Logo.
- Iconos.
- Ilustraciones.
- Nuevos textos.
- Nuevos campos.

---

# 13. Modal de cancelación

Referencia visual dentro de:

```text
/docs/redesign
```

Mantener exactamente el flujo y contenido funcional actual.

## Estructura

La modal debe conservar:

- Tarjeta blanca centrada.
- Fondo overlay.
- Icono superior relacionado con cancelación/calendario.
- Icono secundario de ayuda/pregunta si aparece en la referencia.
- Pregunta de confirmación.
- Texto explicativo.
- Dos botones apilados.

Ejemplo de contenido:

```text
¿Quiere cancelar la reserva del día 6 de abril
de 11:30 a 13:00?

Esta acción no se puede deshacer una vez confirmada
y la pista quedará disponible para otros socios.
```

El texto real debe seguir generándose con la fecha y horario de la reserva seleccionada.

## Colores definitivos

### Botón `Anular reserva`

- Fondo rojo.
- Texto blanco.
- Acción destructiva real: confirma la cancelación.

### Botón `Continuar`

- Fondo azul/turquesa principal.
- Texto blanco.
- Acción no destructiva: cierra la modal y mantiene la reserva.

No usar verde en ninguno de los botones.

## Restricciones

No cambiar:

- Texto funcional salvo adaptación dinámica de fecha/hora.
- Orden de acciones.
- Flujo de cancelación.
- RPC.
- Lógica de negocio.

No añadir:

- Tercer botón.
- Checkbox.
- Información adicional.
- Nuevas advertencias.
- Acciones distintas.

---

# 14. Responsive

## Mobile First

La referencia principal es móvil.

Debe funcionar correctamente en:

- Android.
- iPhone.
- Tablet.
- Escritorio.

## Móvil

- Menú lateral oculto inicialmente.
- Slots en distribución 3 + 2 + 2.
- Sin navegación inferior.
- Tarjetas con márgenes laterales adecuados.
- Inputs y botones cómodos para interacción táctil.
- Horarios sin cortes ni wrap a 360, 390 y 430 px.

## Escritorio

Adaptar los contenedores al ancho disponible.

No convertir la aplicación en una interfaz completamente distinta.

Mantener el mismo lenguaje visual.

---

# 15. Reutilización de componentes

No duplicar estilos entre páginas.

Reutilizar:

- AppHeader.
- SideMenu.
- Cards.
- Buttons.
- Inputs.
- Colors/tokens.
- Tipografía.
- Espaciados.
- Shadows.
- Border radius.

Crear clases/variables compartidas si la implementación actual no las tiene.

No realizar una reescritura completa de componentes funcionales si basta con modificar presentación.

---

# 16. Restricciones funcionales

Este rediseño NO debe modificar:

- RPC.
- Lógica de reservas.
- Límites de reservas.
- Reglas de slot expirado.
- Estado `completed`.
- Realtime.
- Autenticación.
- RLS.
- Notificaciones.
- Lógica de alias.
- Supabase.
- Base de datos.
- Temporadas.
- Rollover.
- Flujo de cancelación.

La UI debe adaptarse a la lógica existente, no al revés.

---


# 17. Observabilidad y logs

Además del rediseño visual, incorporar **logging estratégico** para facilitar el diagnóstico de posibles incidencias en desarrollo y producción.

El objetivo no es registrar cada acción de la aplicación, sino disponer de información suficiente para reconstruir qué ha ocurrido cuando un usuario comunique un problema.

## Principio fundamental

**La incorporación de logs no autoriza ningún cambio funcional.**

Los logs deben limitarse a observar y registrar el comportamiento existente.

No modificar para facilitar el logging:

- Reglas de negocio.
- Flujos de usuario.
- RPC ni sus contratos.
- RLS.
- Esquema de base de datos.
- Estados de reservas.
- Autenticación.
- Realtime.
- Temporizadores.
- Rollover.
- Notificaciones.
- Comportamiento de los stores.
- Resultado de ninguna operación.

Si para añadir un log fuese necesario alterar el comportamiento funcional, no realizar ese cambio y comunicarlo.

## Estrategia

Evitar `console.log()` dispersos por toda la aplicación.

Preferiblemente crear una abstracción pequeña y reutilizable, por ejemplo:

```text
logger.debug(...)
logger.info(...)
logger.warn(...)
logger.error(...)
```

La solución debe ser sencilla y proporcional al tamaño de esta aplicación. No introducir plataformas externas de observabilidad, dependencias pesadas ni infraestructura adicional salvo aprobación expresa.

Los logs de depuración deben poder reducirse o desactivarse en producción, manteniendo los errores y eventos realmente útiles para diagnóstico.

## Puntos estratégicos

Añadir logs donde aporten valor real, especialmente en:

### Autenticación y sesión

- Inicio de intento de login, sin registrar credenciales.
- Login correcto.
- Login fallido.
- Restauración de sesión.
- Cierre de sesión.
- Detección de usuario deshabilitado.
- Errores recuperando el perfil.

### Reservas

- Inicio de solicitud de reserva.
- Reserva creada correctamente.
- Reserva rechazada por backend/RPC.
- Error inesperado al crear una reserva.
- Inicio de cancelación.
- Cancelación correcta.
- Cancelación rechazada.
- Error inesperado durante la cancelación.
- Ejecución de `complete_expired_bookings()`.
- Resultado relevante o error de dicha operación.

Cuando resulte útil para diagnóstico, se pueden registrar identificadores técnicos, fecha y `slot_id`, pero evitando información sensible.

### Realtime

- Inicialización de las suscripciones relevantes.
- Estado de conexión cuando sea útil.
- Errores de suscripción.
- Eventos relevantes recibidos cuando sea necesario para diagnosticar sincronización.
- Cierre o limpieza de canales.

Evitar generar ruido registrando indiscriminadamente cada detalle interno de Realtime.

### Temporizadores y rollover

- Programación del siguiente evento temporal relevante.
- Ejecución del temporizador de expiración de slots/reservas.
- Ejecución del rollover diario de las 22:01/23:01.
- Recargas derivadas de estos eventos.
- Errores producidos durante estas operaciones.

### Supabase y carga de datos

Registrar errores relevantes al:

- Cargar reservas.
- Cargar notificaciones.
- Cargar perfil.
- Cargar configuración/slots.
- Ejecutar RPC.
- Procesar operaciones que afecten al estado visible de la aplicación.

No duplicar el mismo error innecesariamente en varias capas.

## Contexto de los logs

Cuando sea útil, incluir contexto estructurado que facilite localizar una incidencia, por ejemplo:

```text
operation
bookingId
bookingDate
slotId
userId
errorCode
```

No es obligatorio que todos los logs tengan todos esos campos.

Priorizar mensajes claros y contexto técnico útil frente a grandes bloques de texto.

## Información que nunca debe registrarse

No registrar bajo ninguna circunstancia:

- Contraseñas.
- JWT.
- Access tokens.
- Refresh tokens.
- Cookies de sesión.
- `SUPABASE_SERVICE_ROLE_KEY`.
- Claves privadas.
- Cabeceras `Authorization`.
- Objetos completos de sesión si contienen tokens.
- Credenciales.
- Variables de entorno completas.

Evitar también registrar objetos completos de Supabase si pueden contener información innecesaria o sensible.

## Niveles orientativos

### `debug`

Información útil principalmente durante desarrollo:

- Programación de temporizadores.
- Detalles internos de actualización.
- Eventos Realtime de diagnóstico.

### `info`

Operaciones relevantes completadas normalmente:

- Sesión restaurada.
- Reserva creada.
- Reserva cancelada.
- Rollover ejecutado.

### `warn`

Situaciones anómalas pero controladas:

- Operación rechazada por una regla conocida.
- Perfil deshabilitado.
- Estado inesperado recuperable.

### `error`

Fallos que requieren diagnóstico:

- Error de Supabase.
- Error inesperado de RPC.
- Fallo de suscripción Realtime.
- Error cargando información necesaria.

## Tests de logging

No convertir los tests en comprobaciones frágiles de cada mensaje de log.

Añadir tests únicamente cuando exista lógica propia relevante en la abstracción de logging, por ejemplo:

- Que no se emitan logs `debug` en producción si así se configura.
- Que la abstracción respete los niveles definidos.
- Que la sanitización elimine información sensible si se implementa una función específica para ello.

Los tests funcionales existentes deben seguir validando el comportamiento de la aplicación, no la presencia de mensajes concretos en consola.


# 18. Documentación

Actualizar los documentos de `/docs` que describan:

- Colores.
- Layout.
- Componentes.
- Menú.
- Estados visuales.
- Pantallas.
- Responsive.
- Diseño.
- Modal de cancelación.

Las referencias visuales antiguas no deben seguir figurando como diseño vigente si han sido sustituidas por `/docs/redesign`.

Actualizar especialmente:

- `02-ui-ux.md`
- `08-pages.md`
- `09-components.md`

y cualquier otro documento afectado.

---

# 19. Tests

Actualizar o añadir tests para comprobar como mínimo:

## Menú

- Alias dinámico.
- Orden correcto.
- Rutas correctas.
- Estado activo.
- Salir en rojo.
- Sin avatar/monograma duplicado.

## Reservas

- Estados visuales correctos.
- Slots en estructura esperada.
- Distribución móvil 3 + 2 + 2.
- Fecha completa en una línea.
- Cards expandidas por defecto y colapsables de forma independiente.
- Sin navegación inferior.
- Sin avatar en cabecera.

## Notificaciones

- Nueva reserva usa estilo azul/turquesa.
- Anulación usa estilo rojo.
- Sin iconos adicionales.

## Mis reservas

- Con reservas solo se muestran tarjetas.
- Sin reservas aparece estado vacío.
- No aparecen contadores `2/3`.
- No aparecen barras de progreso.

## Cambiar alias

- No se muestra alias actual.
- Solo input, ayuda de máximo 20 caracteres y botón.
- Validaciones existentes siguen funcionando.

## Login

- Estructura funcional intacta.
- Sin elementos nuevos.

## Modal de cancelación

- `Anular reserva` usa estilo rojo.
- `Continuar` usa estilo azul/turquesa.
- No existe botón verde.
- `Anular reserva` ejecuta la acción destructiva.
- `Continuar` cierra la modal sin cancelar.
- Fecha y horario mostrados corresponden a la reserva seleccionada.
- No se altera el flujo existente de `cancel_booking()`.

---

# 20. Validación final

Al terminar:

```bash
npm test
npm run lint
npm run type-check
npm run build
```

Todos deben finalizar correctamente.

Además realizar revisión visual en:

- móvil estrecho;
- móvil grande;
- tablet;
- escritorio.

---

# 21. Entrega esperada de Codex

No desplegar.

Entregar:

1. Archivos modificados.
2. Componentes modificados.
3. Tokens/variables visuales creados.
4. Documentos actualizados.
5. Tests añadidos o modificados.
6. Resultado de `npm test`, `npm run lint`, `npm run type-check` y `npm run build`.
7. Cualquier desviación necesaria respecto a las referencias visuales.
8. Cualquier contradicción encontrada antes de resolverla de forma autónoma.
9. Resumen de los puntos estratégicos donde se han incorporado logs y niveles utilizados.
10. Confirmación expresa de que el rediseño y el logging no han modificado ninguna funcionalidad, regla de negocio, RPC, RLS, esquema de base de datos ni flujo existente.

## Regla final de implementación

**La funcionalidad actual queda congelada durante este trabajo.**

Codex debe tratar este documento como un trabajo de **rediseño visual + observabilidad**, no como una nueva fase funcional.

No aprovechar el rediseño ni la incorporación de logs para refactorizar o cambiar comportamiento que ya funciona, salvo cambios puramente técnicos imprescindibles y sin impacto funcional.

Si Codex detecta una mejora funcional, bug, inconsistencia o posible refactorización fuera de este alcance:

1. No implementarla.
2. Documentarla.
3. Comunicarla al finalizar o solicitar aclaración si bloquea el trabajo.

Si durante la implementación surge una duda funcional, detener esa parte y consultar antes de modificar reglas de negocio.
