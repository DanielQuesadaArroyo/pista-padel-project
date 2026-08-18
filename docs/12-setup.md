# 12 - Setup

## Objetivo

Este documento describe el proceso de instalación, configuración y puesta en marcha del proyecto Jardines de Hércules II - Pista de Pádel.

---

# Requisitos Previos

Antes de comenzar será necesario disponer de:

## Software

- Node.js LTS
- npm
- Git

## Servicios

- Cuenta de Supabase

## Editor recomendado

- Visual Studio Code

---

# Creación del Proyecto

## Crear aplicación Nuxt

```bash
npx nuxi@latest init jardines-hercules-padel
```

Entrar en el proyecto:

```bash
cd jardines-hercules-padel
```

Instalar dependencias:

```bash
npm install
```

---

# Dependencias Principales

## Supabase

Instalar:

```bash
npm install @supabase/supabase-js
```

---

# Configuración de Supabase

## Crear proyecto

Crear un nuevo proyecto en Supabase.

---

## Obtener credenciales

Desde:

```text
Project Settings
→ API
```

Obtener:

```text
Project URL
Anon Key
```

---

# Variables de Entorno

Crear:

```text
.env
```

Contenido:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

# Configuración Nuxt

## Runtime Config

Archivo:

```text
nuxt.config.ts
```

Ejemplo:

```ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    },
  },
})
```

---

# Base de Datos

## Crear tablas

Crear las tablas definidas en:

```text
03-database.md
```

Tablas:

```text
profiles
settings
slots
bookings
notifications
```

---

# Authentication

## Configurar Auth

En Supabase:

```text
Authentication
→ Providers
```

Mantener únicamente:

```text
Email
```

---

## Crear primer usuario

Desde:

```text
Authentication
→ Users
```

Crear manualmente:

```text
Email
Contraseña
```

---

## Crear perfil

Insertar registro correspondiente en:

```text
profiles
```

---

# Configuración Inicial

## Settings

Insertar registro inicial en:

```text
settings
```

Ejemplo:

```text
summer_start = 2026-05-01
summer_end = 2026-09-30
```

---

## Slots Invierno

Insertar:

```text
10:00 - 11:30
11:30 - 13:00
13:00 - 14:30
17:00 - 18:00
18:00 - 19:00
19:00 - 20:30
20:30 - 22:00
```

---

## Slots Verano

Insertar:

```text
10:00 - 11:30
11:30 - 13:00
13:00 - 14:30
18:00 - 19:00
19:00 - 20:00
20:00 - 21:30
21:30 - 23:00
```

---

# Arranque Local

Ejecutar:

```bash
npm run dev
```

Aplicación disponible en:

```text
http://localhost:3000
```

---

# Build Producción

Generar build:

```bash
npm run build
```

Previsualizar:

```bash
npm run preview
```

---

# Despliegue

## Recomendado

Vercel

o

Netlify

---

## Variables de entorno

Configurar en el proveedor:

```text
SUPABASE_URL
SUPABASE_ANON_KEY
```

---

# Estructura Documental

La carpeta:

```text
/docs
```

debe contener:

```text
00-project-overview.md
01-business-rules.md
02-ui-ux.md
03-database.md
04-authentication.md
05-reservations.md
06-realtime.md
07-api.md
08-pages.md
09-components.md
10-testing.md
11-development-rules.md
12-setup.md
```

---

# Diseños

Los diseños oficiales deben almacenarse en:

```text
/docs/redesign
```

Ejemplo:

```text
Acerca-de.png
Calendario.png
Cambio-alias.png
Login.png
Menu.png
Modal-Cancelar.png
My-reservations.png
Normas-Uso.png
Notificaciones.png
```

---

# Verificación Inicial

Antes de comenzar el desarrollo comprobar:

- Login operativo.
- Supabase conectado.
- Tablas creadas.
- Variables de entorno configuradas.
- Primer usuario creado.
- Slots cargados.
- Settings cargados.

---

# Referencias

La implementación deberá seguir obligatoriamente los documentos definidos en la carpeta:

```text
/Docs
```

y los diseños almacenados en:

```text
/docs/redesign
```
