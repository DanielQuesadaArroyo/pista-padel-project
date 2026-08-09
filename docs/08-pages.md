# Jardines de hercules Pista Padel

## 08 - Pages

**Versión:** 1.0

Este documento describe todas las páginas de la aplicación.

---

# 1. Login

Objetivo: autenticar al usuario.

Componentes:

- Logo
- Email
- Contraseña
- Botón iniciar sesión
- Recuperar contraseña
- Acceso a solicitud de alta

---

# 2. Solicitud de acceso

Campos:

- Escalera
- Planta
- Puerta
- Email

Botón:

- Solicitar acceso

Estados:

- Formulario
- Enviado
- Error

---

# 3. Reservas

Página principal.

Elementos:

- Cabecera
- Calendario de 7 días
- Slots
- Toast
- Realtime

Acciones:

- Reservar
- Cancelar (si es propia)

---

# 4. Mis reservas

Lista cronológica de reservas futuras.

Cada tarjeta muestra:

- Fecha
- Horario
- Estado
- Botón cancelar

---

# 5. Cambiar alias

Componentes:

- Alias actual
- Nuevo alias
- Guardar

Validar alias único.

---

# 6. Notificaciones

Lista descendente por fecha.

Cada elemento:

- Icono
- Texto
- Fecha
- Hora

---

# 7. Normas

Contenido obtenido desde la base de datos.

Solo lectura.

---

# 8. Acerca de

Contenido editable desde la base de datos.

Solo lectura.

---

# 9. Drawer

Opciones:

- Notificaciones
- Reservas
- Cambiar alias
- Mis reservas
- Normas
- Acerca de
- Salir

Cabecera:

- Alias

---

# 10. Página 404

Mensaje amigable.

Botón:

- Volver a reservas.

---

# 11. Página de error

Mostrar error controlado.

Permitir reintentar.

Nunca mostrar trazas técnicas.

---

# 12. Estados comunes

Cada página deberá contemplar:

- Loading
- Empty
- Error
- Success

---

# 13. Responsive

Diseño Mobile First.

Anchura máxima recomendada: 480 px.

---

# 14. Checklist

- Navegación consistente.
- Cabecera homogénea.
- Drawer único.
- Skeletons.
- Toasts.
- Sin alertas del navegador.
