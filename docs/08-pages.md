# 08 - Pages

## Objetivo

Este documento define las páginas de la aplicación Jardines de Hércules II - Pista de Pádel.

Las referencias visuales oficiales se encuentran en:

```text
/docs/redesign
```

Los PNGs incluidos en dicha carpeta constituyen la referencia de diseño para la implementación.

---

# Estructura de Navegación

```text
Login
   │
   ▼
Notificaciones
   │
   ├── Reservas
   ├── Mis reservas
   ├── Cambiar alias
   ├── Normas de uso
   ├── Acerca de
   └── Salir
```

---

# Página: Login

## Referencia

```text
Login.png
```

## Objetivo

Permitir la autenticación del usuario.

## Elementos

- Campo email.
- Campo contraseña.
- Botón Iniciar sesión.
- Enlace ¿Olvidaste tu contraseña?.

La estructura funcional adopta la identidad azul/turquesa. No incluye logo,
ilustraciones, iconos ni campos adicionales.

## Comportamiento

Si las credenciales son válidas:

```text
Login
↓
Notificaciones
```

---

## Olvidé mi contraseña

Al pulsar:

```text
¿Olvidaste tu contraseña?
```

Se mostrará un mensaje:

```text
Contacte con el presidente de la comunidad para recuperar su acceso.
```

---

# Página: Notificaciones

## Referencia

```text
Notificaciones.png
```

## Objetivo

Pantalla principal de la aplicación.

## Acceso

Primera pantalla tras autenticarse.

## Contenido

Lista de notificaciones.

## Orden

```text
created_at DESC
```

Más recientes primero.

## Estado vacío

Mostrar:

```text
No existen notificaciones para los próximos días.
```

---

# Página: Reservas

## Referencias

```text
Calendario.png
```

## Objetivo

Mostrar disponibilidad y permitir reservas.

## Días visibles

Siempre:

```text
Día actual + 6 días
```

Total:

```text
7 días
```

---

## Estados visuales

### Azul claro

Slot libre y reservable.

### Gris

Slot expirado y no interactivo.

### Negro

Slot ocupado o mantenimiento.

### Rojo

Reserva propia.

## Presentación

Cada día utiliza una tarjeta blanca con icono, día de la semana y fecha. En
móvil los slots se distribuyen en dos columnas de igual ancho; el tercer slot
queda en la columna izquierda sin expandirse. Se muestra una leyenda compacta.
Los chevrons son únicamente decorativos y no añaden acordeones.

---

## Reserva

Al pulsar un slot azul claro:

```text
Reserva inmediata
```

No existe confirmación previa.

---

## Reserva propia

Al pulsar un slot rojo:

```text
Mostrar modal cancelar reserva
```

---

# Página: Mis reservas

## Referencia

```text
My-reservations.png
```

## Objetivo

Mostrar reservas activas del usuario.

## Contenido

Solo reservas activas.

## Orden

```text
Fecha ascendente
```

La más próxima aparece primero.

## Estado vacío

Mostrar:

```text
No tienes reservas. Cuando realices una reserva, aparecerá aquí.
```

Las reservas se presentan en tarjetas con fecha, horario, `Pista de Pádel` y
botón `Cancelar reserva`. No existen contadores ni barras de progreso.

---

## Cancelación

Al pulsar una reserva:

```text
Modal cancelar reserva
```

---

# Página: Cambiar alias

## Referencia

```text
Cambio-alias.png
```

## Objetivo

Modificar el alias visible del usuario.

## Elementos

- Campo alias.
- Botón Guardar.

El input comienza vacío, no muestra el alias actual y se acompaña únicamente
de la ayuda `Máximo 20 caracteres` y las validaciones cuando correspondan. El
botón se presenta como `Guardar alias`.

---

## Validaciones

- Obligatorio.
- Entre 3 y 20 caracteres.
- Único.
- Sin distinguir mayúsculas/minúsculas.
- Alias reservado no permitido.

---

## Guardado

Al guardar correctamente:

```text
Alias actualizado
```

---

# Página: Normas de uso

## Referencia

```text
Normas-Uso.png
```

## Objetivo

Mostrar las normas de utilización de la pista.

## Contenido

Información estática cargada desde:

```text
JSON / TypeScript
```

## Navegación

Scroll vertical.

---

# Página: Acerca de

## Referencia

```text
Acerca-de.png
```

## Objetivo

Mostrar información general de la aplicación.

## Contenido

Información estática cargada desde:

```text
JSON / TypeScript
```

## Navegación

Scroll vertical.

---

# Página inexistente

No existirán páginas para:

- Administración.
- Gestión de usuarios.
- Configuración.
- Estadísticas.
- Históricos.
- Incidencias.
- Sanciones.

Todas las tareas administrativas se realizarán directamente desde Supabase.

---

# Menú Lateral

## Referencia

```text
Menu.png
```

## Opciones

1. Notificaciones
2. Reservas
3. Mis reservas
4. Cambiar alias
5. Normas de uso
6. Acerca de
7. Salir

La cabecera muestra reactivamente el alias actual del usuario autenticado.

También muestra `Jardines de Hércules Fase II` y `Pista de Pádel`, sin avatar,
monograma ni alias duplicado. La ruta activa usa el fondo principal suave y la
opción Salir aparece en rojo.

---

## Comportamiento

El menú estará disponible desde todas las páginas autenticadas.

Todas ellas comparten una cabecera blanca reutilizable con botón hamburguesa,
nombre de pantalla y subtítulo `Pista de Pádel`.

---

# Modal Cancelar Reserva

## Referencia

```text
Modal-Cancelar.png
```

## Uso

Se utilizará:

- Desde Reservas.
- Desde Mis reservas.

---

## Texto

```text
¿Está seguro de que desea cancelar esta reserva?
```

---

## Acciones

### Confirmar

Cancela la reserva.

### Cancelar

Cierra la modal.
