# Jardines de hercules Pista Padel

## 12 - Setup

**Versión:** 1.0

Este documento describe cómo preparar el entorno de desarrollo desde cero.

---

# 1. Requisitos

- Node.js LTS (22 o superior recomendado)
- npm
- Git
- Cuenta en Supabase
- Cuenta en GitHub

---

# 2. Crear proyecto Supabase

1. Crear un proyecto nuevo.
2. Esperar a que finalice la inicialización.
3. Anotar:
   - Project URL
   - Publishable (Anon) Key

No utilizar la Service Role Key en el frontend.

---

# 3. Variables de entorno

Crear un archivo `.env`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

Nunca hardcodear credenciales.

---

# 4. Dependencias

Instalar:

- Nuxt 4
- Vue 3
- TypeScript
- Tailwind CSS
- Pinia
- @nuxtjs/supabase

---

# 5. Base de datos

Aplicar las migraciones para crear todas las tablas definidas en `03-database.md`.

Activar Row Level Security y configurar las políticas.

---

# 6. Datos iniciales

Crear:

- Registro inicial de `settings`.
- Registro inicial de `rules`.
- Franjas horarias de invierno.
- Franjas horarias de verano.

---

# 7. Usuario administrador

Crear manualmente el primer usuario en Supabase Auth y su registro correspondiente en `profiles`.

---

# 8. Desarrollo

Instalar dependencias:

```bash
npm install
```

Iniciar la aplicación:

```bash
npm run dev
```

---

# 9. Verificaciones

Comprobar:

- Login.
- Logout.
- Recuperación de contraseña.
- Realtime.
- Calendario.
- Reservas.
- Cancelaciones.

---

# 10. Checklist

- Proyecto Supabase creado.
- Variables de entorno configuradas.
- Migraciones ejecutadas.
- Datos iniciales cargados.
- Administrador creado.
- Aplicación funcionando correctamente.
