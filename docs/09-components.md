# Jardines de hercules Pista Padel

## 09 - Components

**Versión:** 1.0

Este documento define los componentes reutilizables de la aplicación.

---

# 1. Principios

- Componentes pequeños.
- Responsabilidad única.
- Reutilizables.
- Tipados con TypeScript.
- Sin lógica de negocio.

---

# 2. AppHeader

Responsabilidad:

- Mostrar título.
- Abrir Drawer.

Props:

- title

Eventos:

- menuClick

---

# 3. AppDrawer

Contiene toda la navegación.

Opciones:

- Notificaciones
- Reservas
- Cambiar alias
- Mis reservas
- Normas
- Acerca de
- Salir

---

# 4. ReservationGrid

Componente principal.

Responsabilidad:

Mostrar los 7 días visibles y todos los slots.

Props:

- days
- slots
- bookings
- blockedDays

Eventos:

- reserve
- cancel

Nunca contendrá lógica de negocio.

---

# 5. ReservationSlot

Representa una única celda del calendario.

Estados:

- libre
- ocupado
- propia
- bloqueado

Props:

- state
- label

Eventos:

- click

---

# 6. ReservationCard

Utilizado en:

Mis reservas.

Muestra:

- fecha
- horario
- botón cancelar

---

# 7. AliasForm

Formulario para modificar alias.

Props:

- currentAlias

Eventos:

- save

---

# 8. NotificationItem

Muestra:

- icono
- texto
- fecha
- hora

---

# 9. Toast

Tipos:

- success
- warning
- error
- info

Duración:

2 segundos.

---

# 10. ConfirmationModal

Utilizado únicamente para cancelar reservas.

Botones:

- Continuar
- Anular reserva

---

# 11. LoadingSkeleton

Todos los listados deberán disponer de Skeleton.

---

# 12. EmptyState

Componente reutilizable para:

- Sin reservas.
- Sin notificaciones.
- Sin normas.

---

# 13. ErrorState

Componente reutilizable.

Incluye:

- Icono.
- Mensaje.
- Botón reintentar.

---

# 14. FormInput

Input reutilizable.

Soporta:

- texto
- email
- password

---

# 15. PrimaryButton

Botón principal.

Variantes:

- primary
- secondary
- danger

---

# 16. Reglas

Los componentes:

- No accederán directamente a Supabase.
- No realizarán consultas.
- No implementarán reglas de negocio.
- Emitirán eventos al componente padre.

---

# 17. Checklist

- Componentes reutilizables.
- Sin lógica de negocio.
- Props tipadas.
- Eventos tipados.
- Accesibles.
- Responsabilidad única.
