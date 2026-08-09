# Jardines de hercules Pista Padel

## 05 - Reservations

**Versión:** 1.0

Este documento define toda la lógica funcional relacionada con las reservas de la pista.

Todas las reglas aquí descritas deberán implementarse en backend.

---

# 1. Objetivo

Garantizar un sistema de reservas:

- sencillo
- justo
- consistente
- libre de conflictos

---

# 2. Flujo de reserva

1. El usuario selecciona un slot libre.
2. El frontend solicita la reserva.
3. Backend valida todas las reglas.
4. Si todo es correcto:
   - Inserta la reserva.
   - Publica evento Realtime.
5. El resto de usuarios ve el cambio inmediatamente.

No existe pantalla de confirmación.

---

# 3. Ventana de reservas

Siempre se mostrarán exactamente 7 días naturales:

- Día actual.
- Seis días posteriores.

Ejemplo:

Si hoy es martes 10:

- Martes 10
- Miércoles 11
- Jueves 12
- Viernes 13
- Sábado 14
- Domingo 15
- Lunes 16

La ventana se actualiza automáticamente:

Invierno: 22:01

Verano: 23:01

---

# 4. Reserva del día actual

Solo podrán reservarse franjas cuya hora de inicio sea posterior a la hora actual.

Las franjas ya iniciadas aparecerán ocupadas.

---

# 5. Límite de reservas

Cada usuario podrá tener un máximo de:

- 3 reservas activas

dentro de la ventana visible.

Cuando una reserva salga de la ventana dejará de contar.

---

# 6. Diversidad horaria

Las tres reservas activas deberán pertenecer a horarios distintos.

Nunca podrá repetirse un slot horario dentro de la ventana.

---

# 7. Límite diario

Solo puede existir una reserva por usuario y día.

---

# 8. Franjas válidas

Las reservas únicamente pueden realizarse utilizando los registros definidos en la tabla `time_slots`.

Nunca se crearán horarios manualmente.

---

# 9. Estados del slot

Libre

- Reservable

Reserva propia

- Cancelable

Ocupado

- No seleccionable

Día bloqueado

- Ningún slot disponible

---

# 10. Cancelaciones

Solo el propietario puede cancelar.

Requiere confirmación.

Permitido hasta 5 minutos antes.

---

# 11. Concurrencia

Si dos usuarios reservan simultáneamente:

- Solo uno obtiene la reserva.
- El segundo recibirá error de disponibilidad.

La base de datos garantizará esta regla mediante restricciones.

---

# 12. Validaciones backend

Antes de insertar una reserva deberán comprobarse:

- Usuario autenticado.
- Usuario activo.
- Día visible.
- Slot válido.
- Día no bloqueado.
- Menos de 3 reservas.
- Horario no repetido.
- Sin otra reserva ese mismo día.
- Slot libre.

---

# 13. Realtime

Cada creación o cancelación actualizará automáticamente todos los calendarios conectados.

Nunca será necesario recargar la página.

---

# 14. Errores

- Slot ya reservado.
- Día bloqueado.
- Límite de reservas alcanzado.
- Horario repetido.
- Ya existe una reserva ese día.
- Usuario deshabilitado.
- Error inesperado.

Todos los errores deberán mostrarse mediante Toast.

---

# 15. Casos límite

- Dos usuarios reservando simultáneamente.
- Cambio de ventana a las 22:01 / 23:01.
- Usuario con exactamente 3 reservas.
- Cancelación cinco minutos antes.
- Reserva del último slot del día.
- Cambio de temporada.
- Realtime con varios dispositivos conectados.

---

# 16. Checklist

- Sin reservas duplicadas.
- Validaciones exclusivamente en backend.
- Realtime operativo.
- Ventana móvil correctamente actualizada.
- Tres reservas máximo.
- Horarios distintos.
- Una reserva diaria.
- Cancelación hasta cinco minutos antes.
- Días bloqueados respetados.
