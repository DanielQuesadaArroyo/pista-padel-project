# 08 - Pages

## Objetivo

Este documento define las páginas de la aplicación Jardines de Hércules II - Pista de Pádel.

Las referencias visuales oficiales se encuentran en:

```text
/docs/design
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
Calendario-full.png
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

### Gris

Slot libre.

### Negro

Slot ocupado o mantenimiento.

### Rojo

Reserva propia.

---

## Reserva

Al pulsar un slot gris:

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
My-reservas.png
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
No dispone de reservas activas.
```

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
Cambio-Alias.png
```

## Objetivo

Modificar el alias visible del usuario.

## Elementos

- Campo alias.
- Botón Guardar.

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

---

## Comportamiento

El menú estará disponible desde todas las páginas autenticadas.

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
