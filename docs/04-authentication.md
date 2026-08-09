# Jardines de hercules Pista Padel

## 04 - Authentication

**Versión:** 1.0

Este documento define el sistema de autenticación y autorización de Jardines de hercules Pista Padel.

La autenticación estará completamente basada en Supabase Auth.

---

# 1. Objetivos

- Seguridad.
- Simplicidad.
- Integración nativa con Supabase.
- Sin registro libre.

---

# 2. Filosofía

Solo podrán acceder usuarios aprobados previamente.

No existe autorregistro.

La aprobación se realiza directamente desde la base de datos.

---

# 3. Flujo general

1. El vecino solicita acceso enviando un correo electronico al administrador.
2. Introduce escalera, planta, puerta y email.
3. Se crea una solicitud pendiente.
4. El administrador revisa la solicitud desde Supabase.
5. Si la aprueba:
   - Se crea el usuario en Supabase Auth.
   - Se crea el registro en `profiles`.
   - Se genera un alias (`JH + escalera + planta + puerta`).
   - Se genera una contraseña aleatoria.
6. El usuario inicia sesión con las credenciales recibidas.

---

# 4. Solicitud de acceso

Campos obligatorios:

- Escalera
- Planta
- Puerta
- Email

Validaciones:

- Email válido.
- No puede existir ya un usuario para esa vivienda.
- No puede existir otra solicitud pendiente para esa vivienda.

Estados:

- pending
- approved
- rejected

---

# 5. Inicio de sesión

Credenciales:

- Email
- Contraseña

No existe login mediante Google, Apple o redes sociales.

---

# 6. Recuperación de contraseña

Se utilizará exclusivamente el flujo estándar de Supabase Auth.

No existirá lógica personalizada.

---

# 7. Cambio de alias

El usuario únicamente podrá modificar su alias.

No podrá modificar:

- Email
- Escalera
- Planta
- Puerta

El alias deberá ser único.

---

# 8. Estado del usuario

Campo:

`status`

Valores:

- active
- disabled

Si un usuario está deshabilitado:

- No podrá iniciar sesión.
- No podrá acceder a la aplicación.

---

# 9. Sesión

La sesión será gestionada por Supabase.

La aplicación restaurará automáticamente la sesión si sigue siendo válida.

---

# 10. Logout

Desde el menú lateral.

Acciones:

- Cerrar sesión en Supabase.
- Eliminar la sesión local.
- Redirigir a Login.

---

# 11. Middleware

Todas las rutas privadas utilizarán middleware de autenticación.

Si no existe sesión válida:

- Redirigir a `/login`.

Además deberá comprobarse que:

`status = active`

---

# 12. Seguridad

Nunca confiar en datos enviados por el frontend.

El identificador del usuario siempre se obtendrá mediante:

`auth.uid()`

---

# 13. RLS

Todas las tablas deberán utilizar Row Level Security.

Cada usuario únicamente podrá acceder a:

- Su perfil.
- Sus reservas.

---

# 14. Casos de error

- Usuario o contraseña incorrectos.
- Usuario deshabilitado.
- Solicitud pendiente.
- Alias duplicado.
- Error de conexión.

No revelar información sensible en los mensajes de error.

---

# 15. Checklist

- Sin registro libre.
- Solicitudes aprobadas manualmente.
- Alias único.
- Una vivienda = un usuario.
- Login mediante Supabase Auth.
- Recuperación estándar de contraseña.
- Middleware en todas las rutas privadas.
- RLS en todas las tablas.
- Verificación de `status = active`.
