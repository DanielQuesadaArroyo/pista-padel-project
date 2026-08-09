# Jardines de hercules Pista Padel

## 15 - AI Development Prompts

**Versión:** 1.0

Este documento define las instrucciones que deberán utilizarse con Claude Code, Codex u otros agentes de IA durante el desarrollo.

---

# Prompt maestro

Lee toda la carpeta `/docs` antes de escribir una sola línea de código.

La documentación es la única fuente de verdad del proyecto.

No inventes funcionalidades.

Si existe cualquier contradicción entre documentos, detén la implementación e indícalo.

No tomes decisiones funcionales por tu cuenta.

---

# Reglas generales

- Implementar únicamente lo solicitado.
- No modificar código no relacionado.
- No añadir dependencias innecesarias.
- Mantener la arquitectura definida.
- Escribir código limpio y tipado.

---

# Prompt para crear funcionalidades

Antes de implementar:

1. Identifica los documentos afectados.
2. Resume las reglas que aplican.
3. Implementa únicamente esas reglas.
4. Verifica que no rompes funcionalidades existentes.

---

# Prompt para componentes

Los componentes deberán:

- Ser reutilizables.
- No contener lógica de negocio.
- Recibir datos mediante props.
- Emitir eventos.
- Estar completamente tipados.

---

# Prompt para backend

Toda validación deberá realizarse en backend.

Nunca confiar en datos enviados por el frontend.

---

# Prompt para Supabase

Utilizar:

- Supabase Auth
- PostgreSQL
- Realtime
- RLS

No crear soluciones alternativas.

---

# Prompt para revisiones

Después de cada tarea:

- Revisar TypeScript.
- Revisar lint.
- Revisar rendimiento.
- Revisar duplicación.
- Revisar accesibilidad.

---

# Prompt para refactorización

No modificar el comportamiento funcional.

Solo mejorar:

- legibilidad
- mantenibilidad
- rendimiento

---

# Prompt para corrección de errores

Localizar la causa raíz.

No aplicar soluciones temporales.

No eliminar funcionalidades para ocultar errores.

---

# Checklist final

- Documentación respetada.
- Arquitectura respetada.
- Sin código duplicado.
- Sin lógica de negocio en componentes.
- Backend como fuente de verdad.
- Proyecto compilando sin errores.
