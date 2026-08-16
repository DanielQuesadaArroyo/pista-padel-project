# 18 - Post-Implementation Fixes

## Objetivo

Este documento recoge una ronda de **correcciones posteriores a la
implementación** detectadas durante las pruebas manuales de la
aplicación **Jardines de Hércules II - Pista de Pádel**.

Todas las fases del plan de implementación original ya han sido
completadas.

Por tanto, este documento:

-   NO representa una nueva fase del plan de implementación.
-   NO autoriza nuevas funcionalidades fuera de las descritas aquí.
-   Recoge exclusivamente errores, ajustes y mejoras detectados al
    probar la aplicación ya implementada.
-   Debe aplicarse respetando `AGENTS.md`, `CLAUDE.md` y la
    documentación existente en `/docs`.

## Reglas generales

Antes de modificar código:

1.  Leer `AGENTS.md` y `CLAUDE.md`.
2.  Revisar la documentación relevante de `/docs`.
3.  Revisar los diseños correspondientes de `/docs/design`.
4.  Revisar la implementación actual antes de decidir qué archivos
    modificar.

Durante la implementación:

-   Implementar exclusivamente los cambios descritos en este documento.
-   No introducir nuevas funcionalidades ni modificar reglas de negocio
    no relacionadas.
-   Actualizar todos los documentos `.md` afectados para que
    documentación y código permanezcan sincronizados.
-   Añadir o modificar los tests necesarios para cubrir las nuevas
    casuísticas.
-   No considerar una corrección terminada si no dispone de cobertura
    automatizada cuando sea razonablemente posible.
-   No desplegar.

------------------------------------------------------------------------

# CAMBIO 1 - Reservas finalizadas permanecen activas

## Problema

Una reserva puede mantener `status = 'active'` después de haber
finalizado su fecha y franja horaria, consumiendo incorrectamente una de
las 3 reservas activas permitidas.

## Solución

Añadir el estado `completed` a `bookings.status`.

Las reservas `completed`:

-   No cuentan para el máximo de 3 reservas activas.
-   No cuentan para horario repetido.
-   No cuentan para máximo 1 reserva por día.
-   No aparecen en "Mis reservas".
-   Permanecen en base de datos hasta su eliminación manual.

Crear la RPC:

`complete_expired_bookings()`

Debe transformar a `completed` las reservas con `status = 'active'` cuya
fecha/hora de finalización haya expirado, utilizando `Europe/Madrid` y
`slots.end_time`.

La definición temporal es única en toda la aplicación:

`expirado/completed = hora actual >= end_time + 1 minuto`

Ejemplo para `13:00 - 14:30`:

-   Durante las 14:30 la reserva continúa vigente.
-   Desde las 14:31 se considera expirada.
-   Si todavía figura como `active`, pasa a `completed`.

### Ejecución

Ejecutarla:

1.  Una vez al iniciar/restaurar una sesión autenticada.
2.  En el rollover diario mientras la aplicación permanezca abierta:
    -   22:01 invierno.
    -   23:01 verano.

No ejecutarla en cada navegación y no introducir polling.

Además, mientras exista una sesión autenticada, el temporizador dirigido
al siguiente instante temporal relevante debe:

1.  Ejecutar `complete_expired_bookings()`.
2.  Refrescar la pantalla Reservas.
3.  Refrescar Mis reservas.
4.  Recalcular y programar el siguiente instante relevante.

Se considera instante relevante cada `end_time + 1 minuto` del día actual
y el rollover diario. Esta programación puntual no se considera polling.

### Protección adicional

`create_booking()` NO debe depender de que esta RPC se haya ejecutado.

Las validaciones de reservas activas deben ignorar cualquier reserva
cuya fecha/hora de finalización ya haya expirado aunque todavía figure
como `active`.

### Tests

Cubrir como mínimo:

-   Reserva pasada `active` no consume el límite de 3.
-   La RPC transforma expiradas en `completed`.
-   No modifica reservas futuras, canceladas ni mantenimiento.
-   `completed` no aparece en "Mis reservas".
-   `completed` no afecta a nuevas reservas.
-   Uso correcto de `Europe/Madrid`.

### Documentación

Actualizar los documentos afectados por el nuevo estado `completed`, la
definición de reserva activa, la RPC y el comportamiento de "Mis
reservas".

------------------------------------------------------------------------

# CAMBIO 2 - Expiración automática de slots y nueva semántica visual

## Regla temporal

Para el día actual, un slot libre seguirá siendo reservable hasta el
minuto siguiente a su hora de finalización.

Ejemplo:

`13:00 - 14:30` permanece reservable durante las 14:30 y pasa a expirado
a las `14:31`.

Regla:

`slot expirado = hora actual >= end_time + 1 minuto`

Usar siempre `Europe/Madrid`.

Esta es la misma regla que deben aplicar `create_booking()` y
`complete_expired_bookings()`.

Los slots de días futuros no expiran por la hora actual.

## Actualización automática

La pantalla Reservas debe actualizar automáticamente el estado visual
mientras permanezca abierta.

No utilizar polling periódico. Programar la actualización para el
siguiente instante temporal relevante e integrarla coherentemente con el
mecanismo de rollover existente.

## Validación backend

`create_booking()` debe aplicar exactamente la misma regla. Un cliente
manipulado no podrá reservar un slot expirado.

## Colores definitivos

-   **Azul claro + texto negro:** libre y reservable.
-   **Gris + texto negro:** horario expirado, no reservable.
-   **Negro + texto blanco:** reservado por otro usuario.
-   **Negro + texto blanco:** mantenimiento.
-   **Rojo + texto blanco:** reserva propia; abre modal de cancelación.

La condición temporal prevalece sobre `status = 'active'`. Si por cualquier
retraso una reserva expirada todavía llega al frontend como `active`, el slot
se muestra gris, con texto negro y sin interacción hasta que la RPC regularice
su estado a `completed`.

No mostrar alias de otros usuarios.

## Tests

Cubrir:

-   Slot de hoy antes de `end_time + 1 minuto`.
-   Slot durante el minuto de finalización.
-   Slot expirado a partir del minuto siguiente.
-   Slots futuros.
-   UI no permite reservar expirados.
-   RPC rechaza expirados.
-   Semántica visual de los estados.
-   Actualización automática sin recarga.
-   `Europe/Madrid`.

## Documentación

Actualizar cualquier documento que todavía indique `Gris = libre`.

La semántica final será:

`Azul claro = libre/reservable` `Gris = horario expirado`
`Negro = ocupado por otro usuario o mantenimiento`
`Rojo = reserva propia`

Documentar también la regla `end_time + 1 minuto`.

------------------------------------------------------------------------

# CAMBIO 3 - Alias dinámico y orden del menú

## Alias

Actualmente la cabecera del menú muestra `JH152` hardcodeado.

Debe mostrar siempre el alias real del usuario autenticado obtenido del
estado/perfil existente (`profileStore.alias` o equivalente).

Al cambiar correctamente el alias:

-   La cabecera se actualiza automáticamente.
-   No requiere cerrar sesión.
-   No requiere recargar.

No debe quedar ningún alias de usuario hardcodeado.

## Orden definitivo

1.  Notificaciones
2.  Reservas
3.  Mis reservas
4.  Cambiar alias
5.  Normas de uso
6.  Acerca de
7.  Salir

## Tests

Cubrir:

-   Alias real en cabecera.
-   Ausencia de dependencia de `JH152`.
-   Actualización reactiva tras cambiar alias.
-   Orden exacto del menú.
-   Navegación correcta de cada opción.

## Documentación

Documentar explícitamente el alias dinámico y el orden definitivo.

------------------------------------------------------------------------

# CAMBIO 4 - Iconografía coherente del menú

## Problema

Los iconos actuales no representan correctamente las secciones.

## Implementación

Utilizar una única solución de iconos vectoriales. Preferencia:
`@nuxt/icon` con Lucide si es compatible con el proyecto actual.

Si ya existe una solución equivalente instalada, reutilizarla antes de
añadir dependencias redundantes.

No mezclar familias visuales.

## Correspondencia definitiva

-   Notificaciones -\> `lucide:bell`
-   Reservas -\> `lucide:calendar-days`
-   Mis reservas -\> `lucide:calendar-check`
-   Cambiar alias -\> `lucide:user-cog`
-   Normas de uso -\> `lucide:file-text`
-   Acerca de -\> `lucide:info`
-   Salir -\> `lucide:log-out`

## Estilo

Todos los iconos deben tener:

-   Mismo tamaño visual.
-   Alineación vertical con el texto.
-   Separación horizontal uniforme.
-   Mismo verde del menú.

Referencia aproximada Tailwind:

`w-5 h-5 mr-3 text-emerald-600`

Reutilizar estilos existentes si son equivalentes.

## Tests

Cubrir:

-   Icono correspondiente para cada opción.
-   Orden correcto.
-   Rutas correctas.
-   Sin cambios funcionales derivados de sustituir los iconos.

## Documentación

Actualizar la documentación del menú/componentes con la iconografía
definitiva cuando corresponda.

------------------------------------------------------------------------

# Validación final obligatoria

Revisar que:

-   No quedan aliases hardcodeados.
-   No queda lógica incompatible con `completed`.
-   No queda la semántica antigua `gris = libre`.
-   Frontend y backend aplican la misma expiración de slots.
-   `completed` está permitido por la restricción de `bookings.status`.
-   Existe `complete_expired_bookings()`.
-   Las migraciones son incrementales, reproducibles y no destruyen
    datos.
-   Toda la documentación afectada está sincronizada con la
    implementación.
-   Los tests cubren específicamente los cuatro cambios.

Ejecutar:

``` bash
npm test
npm run lint
npm run type-check
npm run build
```

Todos deben finalizar correctamente.

# Entrega esperada de Codex

No desplegar.

Entregar:

1.  Archivos de código modificados.
2.  Migraciones creadas o modificadas.
3.  Cambios realizados en cada uno de los cuatro puntos.
4.  Documentos de `/docs` actualizados.
5.  Tests añadidos o modificados.
6.  Resultado de `npm test`, `npm run lint`, `npm run type-check` y
    `npm run build`.
7.  Cualquier contradicción o decisión pendiente.

Si aparece una contradicción que requiera cambiar una regla de negocio
no definida aquí, detener esa parte y comunicarla antes de tomar una
decisión autónoma.
