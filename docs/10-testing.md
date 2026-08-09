# Jardines de hercules Pista Padel

## 10 - Testing

**Versión:** 1.0

Este documento define la estrategia de pruebas del proyecto.

---

# 1. Objetivos

Garantizar que todas las reglas de negocio funcionan correctamente y evitar regresiones.

---

# 2. Tipos de pruebas

- Unitarias
- Integración
- End-to-End
- Manuales

---

# 3. Pruebas unitarias

Cubrir:

- Validaciones
- Utilidades
- Composables
- Stores
- Componentes puros

---

# 4. Integración

Verificar:

- Supabase Auth
- Base de datos
- Realtime
- Middleware
- API

---

# 5. End-to-End

Flujos principales:

- Login
- Solicitud de acceso
- Reservar pista
- Cancelar reserva
- Cambiar alias
- Recuperar contraseña
- Logout

---

# 6. Casos de negocio

Comprobar:

- Máximo 3 reservas.
- Una reserva por día.
- Horarios diferentes.
- Día bloqueado.
- Usuario deshabilitado.
- Cancelación cinco minutos antes.
- Actualización de la ventana.
- Cambio de temporada.

---

# 7. Concurrencia

Simular:

- Dos usuarios reservando el mismo slot.
- Múltiples usuarios conectados.
- Realtime.

---

# 8. UI

Verificar:

- Responsive.
- Drawer.
- Toasts.
- Skeletons.
- Estados vacíos.
- Modales.

---

# 9. Rendimiento

Comprobar:

- Tiempo de carga.
- Actualización Realtime.
- Consultas repetidas.

---

# 10. Seguridad

Verificar:

- RLS.
- Acceso a datos ajenos.
- Middleware.
- Usuario deshabilitado.
- Manipulación de peticiones.

---

# 11. Checklist previo al despliegue

- Todas las pruebas unitarias superadas.
- Flujos E2E correctos.
- Sin errores de consola.
- Sin consultas innecesarias.
- Responsive validado.
- Accesibilidad básica comprobada.
- Realtime funcionando.
- Base de datos migrada.
