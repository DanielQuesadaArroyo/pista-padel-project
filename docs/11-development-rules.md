# Jardines de hercules Pista Padel

## 11 - Development Rules

**Versión:** 1.0

Este documento define las normas obligatorias de desarrollo del proyecto.

---

# 1. Principios

- Código limpio.
- Simplicidad.
- Legibilidad.
- Componentes reutilizables.
- TypeScript estricto.

---

# 2. Stack

- Nuxt 4
- Vue 3
- TypeScript
- Pinia
- Tailwind CSS
- Supabase

No incorporar librerías sin una necesidad justificada.

---

# 3. Estructura del proyecto

```
components/
composables/
layouts/
middleware/
pages/
plugins/
server/
stores/
types/
utils/
```

Mantener responsabilidades separadas.

---

# 4. Convenciones

- Componentes: PascalCase
- Composables: useXxx
- Stores: useXxxStore
- Utilidades: camelCase
- Tipos: PascalCase

---

# 5. Componentes

Los componentes:

- No accederán directamente a la base de datos.
- No contendrán reglas de negocio.
- Emitirán eventos al padre.
- Recibirán datos mediante props.

---

# 6. Composables

Toda comunicación con Supabase deberá centralizarse en composables reutilizables.

No duplicar consultas.

---

# 7. Stores

Pinia almacenará únicamente estado compartido.

No guardar datos derivados que puedan calcularse.

---

# 8. Backend

Toda regla crítica deberá ejecutarse en backend.

Nunca confiar en validaciones del frontend.

---

# 9. Base de datos

Las modificaciones del esquema se realizarán exclusivamente mediante migraciones.

No modificar tablas manualmente en producción.

---

# 10. Seguridad

- RLS obligatoria.
- auth.uid() como única fuente de identidad.
- No confiar en parámetros enviados por el cliente.

---

# 11. Estilo

- Funciones pequeñas.
- Un único propósito por función.
- Evitar anidamientos profundos.
- Retornos tempranos.
- Código autodocumentado.

---

# 12. Comentarios

Comentar únicamente decisiones complejas.

No comentar código evidente.

---

# 13. Manejo de errores

Todos los errores deberán controlarse.

Nunca mostrar errores internos al usuario.

Registrar errores para depuración.

---

# 14. Rendimiento

- Evitar consultas repetidas.
- Reutilizar resultados.
- Lazy loading cuando proceda.
- Mantener el número de renders al mínimo.

---

# 15. Accesibilidad

Todos los elementos interactivos deberán ser accesibles mediante teclado y disponer de etiquetas apropiadas.

---

# 16. Git

Commits pequeños y descriptivos.

No mezclar cambios funcionales con refactorizaciones.

---

# 17. Calidad

Antes de considerar una tarea finalizada:

- Sin errores de TypeScript.
- Sin errores de lint.
- Sin warnings importantes.
- Pruebas superadas.

---

# 18. Prohibiciones

No:

- Duplicar lógica.
- Hardcodear reglas de negocio.
- Acceder directamente a tablas desde componentes.
- Ignorar errores.
- Crear código muerto.

---

# 19. Reglas para IA

Claude/Codex deberán:

- Respetar toda la documentación de `/docs`.
- No inventar funcionalidades.
- Reutilizar código existente.
- Mantener coherencia con la arquitectura.
- Solicitar aclaraciones si existe ambigüedad.

---

# 20. Checklist

- Arquitectura respetada.
- Código modular.
- Tipado completo.
- Reglas de negocio en backend.
- Componentes reutilizables.
- Sin duplicación.
- Documentación actualizada.
