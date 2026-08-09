# Jardines de hercules Pista Padel

## 13 - User Flows

**Versión:** 1.0

Este documento define los flujos funcionales completos de la aplicación.

---

# 1. Objetivo

Todos los flujos descritos aquí son la referencia funcional para la implementación.

La IA no deberá modificar estos flujos ni añadir pasos adicionales.

---

# 2. Inicio de sesión

```text
Usuario
   │
   ▼
Pantalla Login
   │
Introduce email y contraseña
   │
   ▼
Supabase Auth
   │
¿Credenciales válidas?
 ├── No → Mostrar error
 └── Sí
      │
      ▼
¿status = active?
 ├── No → Cerrar sesión y mostrar mensaje
 └── Sí
      │
      ▼
Pantalla de Reservas
```

---

# 3. Alta de usuario

```text
Vecino
   │
   ▼
Envía email al administrador
   │
   ▼
Administrador revisa solicitud
   │
¿Aprobada?
 ├── No → No se crea usuario
 └── Sí
      │
      ▼
Crear usuario en Supabase Auth
      │
Crear registro en profiles
      │
Generar contraseña aleatoria
      │
Comunicar credenciales
```

---

# 4. Crear reserva

```text
Seleccionar slot libre
      │
      ▼
Validaciones backend
      │
¿Todas correctas?
 ├── No → Mostrar error
 └── Sí
      │
      ▼
Insertar reserva
      │
Evento Realtime
      │
Actualizar todos los clientes
```

Validaciones:

- Usuario activo.
- Día visible.
- Máximo 3 reservas.
- Horario distinto.
- Una reserva por día.
- Slot libre.
- Día no bloqueado.

---

# 5. Cancelar reserva

```text
Reserva propia
      │
      ▼
Modal confirmación
      │
¿Confirmar?
 ├── No → Cancelar acción
 └── Sí
      │
      ▼
¿Faltan más de 5 minutos?
 ├── No → Error
 └── Sí
      │
      ▼
Eliminar reserva
      │
Realtime
```

---

# 6. Cambio de alias

```text
Abrir pantalla
      │
Introducir alias
      │
Validar unicidad
      │
Guardar
      │
Actualizar interfaz
```

---

# 7. Recuperar contraseña

```text
Login
   │
¿Olvidaste tu contraseña?
   │
Introducir email
   │
Supabase envía correo
   │
Nueva contraseña
```

---

# 8. Logout

```text
Drawer
   │
Salir
   │
Supabase SignOut
   │
Eliminar sesión
   │
Volver a Login
```

---

# 9. Cambio de ventana

A las:

- 22:01 (invierno)
- 23:01 (verano)

Se elimina el día expirado y se añade un nuevo día al final de la ventana.

---

# 10. Diagramas de decisión

Si cualquier validación falla, nunca se modificará la base de datos.

Toda decisión funcional corresponde al backend.

---

# 11. Checklist

- Flujos implementados sin modificaciones.
- Validaciones centralizadas.
- Realtime en reservas y cancelaciones.
- Sin pasos adicionales no documentados.
