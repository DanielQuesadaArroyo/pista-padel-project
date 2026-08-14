# 10 - Testing

## Objetivo

Este documento define la estrategia de pruebas para la aplicación Jardines de Hércules II - Pista de Pádel.

El objetivo es garantizar que las funcionalidades críticas funcionan correctamente antes de poner la aplicación en producción.

---

# Estrategia

La prioridad será validar:

- Reglas de negocio.
- Reservas.
- Autenticación.
- Integridad de datos.
- Experiencia de usuario.

## Automatización

- Las utilidades, validaciones, servicios, stores y componentes críticos se cubrirán con pruebas unitarias usando Vitest.
- Las RPC, RLS y la concurrencia se comprobarán con pruebas de integración en un proyecto Supabase de pruebas aislado.
- Las pruebas no usarán credenciales, reservas ni notificaciones reales de la comunidad.
- `npm test` ejecutará la suite automatizada; `npm run type-check` y `npm run lint` seguirán siendo comprobaciones obligatorias e independientes.

---

# Pruebas de Autenticación

## Login correcto

### Escenario

Usuario válido.

### Resultado esperado

- Inicio de sesión correcto.
- Redirección a Notificaciones.

---

## Contraseña incorrecta

### Resultado esperado

- Error de autenticación.
- Permanencia en Login.

---

## Usuario inexistente

### Resultado esperado

- Error de autenticación.

---

## Usuario deshabilitado

### Escenario

```text
profiles.active = false
```

### Resultado esperado

- Cierre automático de sesión.
- Redirección a Login.
- Mensaje informativo.

---

# Pruebas de Alias

## Cambio correcto

### Resultado esperado

- Alias actualizado.
- Persistencia en base de datos.

---

## Alias vacío

### Resultado esperado

- Botón Guardar deshabilitado.

---

## Alias menor de 3 caracteres

### Resultado esperado

Mensaje:

```text
El alias debe tener al menos 3 caracteres.
```

---

## Alias mayor de 20 caracteres

### Resultado esperado

Mensaje:

```text
El alias no puede superar los 20 caracteres.
```

---

## Alias duplicado

### Resultado esperado

Error de validación.

---

## Alias reservado

Valores:

```text
admin
administrador
presidente
system
sistema
```

### Resultado esperado

Error de validación.

---

# Pruebas de Reservas

## Reserva válida

### Resultado esperado

- Reserva creada.
- Slot actualizado.
- Notificación creada.

---

## Máximo 3 reservas activas

### Escenario

Usuario con 3 reservas activas.

### Resultado esperado

Mensaje:

```text
Ha alcanzado el máximo de 3 reservas activas.
```

---

## Segunda reserva el mismo día

### Resultado esperado

Error de validación.

---

## Horario repetido

### Resultado esperado

Error de validación.

---

## Slot ocupado

### Resultado esperado

No se crea la reserva.

---

## Slot mantenimiento

### Resultado esperado

No se crea la reserva.

## Fecha fuera de la ventana visible

### Resultado esperado

No se crea la reserva.

## Slot de temporada incorrecta

### Resultado esperado

No se crea la reserva.

---

# Pruebas de Concurrencia

## Reserva simultánea

### Escenario

Dos usuarios intentan reservar el mismo slot.

### Resultado esperado

- Solo una reserva creada.
- La otra operación falla.

---

# Pruebas de Cancelación

## Cancelación desde Mis reservas

### Resultado esperado

- Reserva cancelada.
- Notificación creada.

## Reserva inexistente

### Resultado esperado

- La RPC de cancelación devuelve un error.
- No se modifica ninguna reserva ni se crea una notificación.

## Reserva ajena

### Resultado esperado

- La RPC de cancelación devuelve un error.
- No se modifica la reserva ajena ni se crea una notificación.

## Reserva no activa o doble confirmación

### Resultado esperado

- La RPC de cancelación devuelve un error.
- No se crea una segunda notificación.

## Slot liberado tras cancelar

### Resultado esperado

- Una reserva cancelada no impide que otro usuario reserve la misma fecha y franja.

---

## Cancelación desde Reservas

### Resultado esperado

- Apertura de modal.
- Cancelación correcta.

---

## Cancelación abortada

### Resultado esperado

- No se realizan cambios.

---

# Pruebas de Notificaciones

## Nueva notificación

### Resultado esperado

- Visible automáticamente.
- Actualización Realtime.

---

## Eliminación

### Resultado esperado

- Desaparición automática.

---

## Estado vacío

### Resultado esperado

Mostrar:

```text
No existen notificaciones para los próximos días.
```

---

# Pruebas de Calendario

## Ventana de 7 días

### Resultado esperado

Mostrar:

```text
Día actual + 6 días
```

---

## Cambio de día invierno

### Hora

```text
22:01
```

### Resultado esperado

- Eliminar día actual.
- Añadir nuevo día.

---

## Cambio de día verano

### Hora

```text
23:01
```

### Resultado esperado

- Eliminar día actual.
- Añadir nuevo día.

---

# Pruebas Realtime

## Nueva reserva

### Resultado esperado

Actualización automática.

---

## Cancelación

### Resultado esperado

Actualización automática.

---

## Nueva notificación

### Resultado esperado

Actualización automática.

---

## Usuario deshabilitado

### Resultado esperado

Logout automático.

---

# Pruebas Responsive

## Dispositivos

Validar:

- Android.
- iPhone.
- Tablet.
- Navegador escritorio.

---

# Pruebas de Rendimiento

## Carga inicial

### Objetivo

Tiempo de carga reducido.

---

## Navegación

### Objetivo

Transiciones fluidas.

---

## Realtime

### Objetivo

Sin retrasos perceptibles.

---

# Pruebas de Seguridad

## Profiles

Un usuario no puede acceder a perfiles ajenos.

---

## Reservas

Un usuario no puede modificar reservas ajenas ni actualizar `bookings` directamente; solo puede crear y cancelar mediante las RPC autorizadas.

---

## Notificaciones

Solo lectura para usuarios autenticados.

---

# Criterio de Aceptación

La aplicación se considerará apta para producción cuando:

- Todas las pruebas críticas sean satisfactorias.
- No existan errores bloqueantes.
- Las reglas de negocio estén correctamente implementadas.
- La experiencia móvil sea correcta.
