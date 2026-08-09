# Jardines de hercules Pista Padel

## 16 - Development Roadmap

**Versión:** 1.0

Este documento define el orden exacto en el que Claude Code, Codex o cualquier agente de IA deberá desarrollar la aplicación.

La prioridad es mantener un proyecto estable y funcional en todo momento.

---

# Objetivos

- Implementar el proyecto de forma incremental.
- Evitar grandes cambios simultáneos.
- Mantener siempre una versión ejecutable.
- Validar cada fase antes de continuar.

---

# Fase 0 - Preparación

## Tareas

- Leer toda la carpeta `/docs`.
- Analizar dependencias entre documentos.
- No generar código todavía.
- Confirmar que no existen contradicciones.

**Entregable**

- Resumen de arquitectura.
- Lista de dudas (si existen).

---

# Fase 1 - Creación del proyecto

## Objetivos

Crear el proyecto base.

## Tareas

- Crear proyecto Nuxt 4.
- Configurar TypeScript.
- Instalar Tailwind.
- Instalar Pinia.
- Instalar módulo de Supabase.
- Configurar ESLint.
- Configurar Prettier.
- Configurar variables de entorno.

**Entregable**

Proyecto ejecutándose con:

```
npm run dev
```

---

# Fase 2 - Base de datos

## Tareas

- Crear migraciones.
- Crear tablas.
- Crear índices.
- Crear restricciones.
- Configurar claves foráneas.
- Activar RLS.
- Crear políticas.
- Insertar datos iniciales.

**Entregable**

Base de datos completamente funcional.

---

# Fase 3 - Autenticación

## Tareas

- Login.
- Logout.
- Recuperación de contraseña.
- Middleware.
- Protección de rutas.
- Perfil del usuario.

**Entregable**

Sistema de autenticación operativo.

---

# Fase 4 - Layout

## Tareas

- Layout principal.
- Header.
- Drawer.
- Navegación.
- Toast.
- Skeletons.
- Error pages.

**Entregable**

Aplicación navegable.

---

# Fase 5 - Calendario

## Tareas

- Calendario.
- Vista de 7 días.
- Slots.
- Colores.
- Temporadas.
- Responsive.

**Entregable**

Calendario completamente visual.

---

# Fase 6 - Reservas

## Tareas

- Crear reserva.
- Cancelar reserva.
- Mis reservas.
- Validaciones backend.
- Mensajes de error.

**Entregable**

Reservas totalmente funcionales.

---

# Fase 7 - Realtime

## Tareas

- Suscripciones.
- Actualización automática.
- Gestión de concurrencia.
- Reconexión.

**Entregable**

Actualización en tiempo real.

---

# Fase 8 - Contenido

## Tareas

- Normas.
- Acerca de.
- Notificaciones.
- Cambio de alias.

**Entregable**

Aplicación completa funcionalmente.

---

# Fase 9 - Calidad

## Tareas

- Refactorización.
- Eliminación de duplicados.
- Optimización.
- Accesibilidad.
- Revisión de rendimiento.

---

# Fase 10 - Testing

## Tareas

- Unit Testing.
- Integration Testing.
- End-to-End.
- Casos límite.
- Revisión manual.

---

# Normas obligatorias para la IA

Antes de comenzar cualquier fase:

1. Leer la documentación relacionada.
2. No modificar fases anteriores sin motivo.
3. Mantener compatibilidad.
4. No inventar funcionalidades.
5. No romper la arquitectura.

---

# Criterios de aceptación

Cada fase solo podrá darse por finalizada cuando:

- Compile sin errores.
- Sin errores de TypeScript.
- Sin errores de lint.
- Cumpla la documentación.
- No existan regresiones.

---

# Prompt recomendado para cada fase

Al comenzar una nueva fase utilizar siempre un prompt similar a:

> Lee toda la carpeta `/docs`. Implementa únicamente la **Fase X** descrita en este documento. No avances a fases posteriores. Respeta estrictamente la arquitectura, las reglas de negocio y los documentos de referencia. Si detectas contradicciones o información insuficiente, detén la implementación y solicita aclaraciones antes de escribir código.

---

# Checklist final

- Todas las fases completadas.
- Toda la documentación respetada.
- Código limpio.
- Arquitectura consistente.
- Proyecto desplegable.
