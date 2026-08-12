# 00 - Project Overview

## Descripción General

Jardines de Hércules II - Pista de Pádel es una aplicación web responsive para la gestión de reservas de una única pista de pádel dentro de la comunidad de propietarios Jardines de Hércules II.

La aplicación está diseñada para ser extremadamente simple, fácil de utilizar desde dispositivos móviles y con una administración mínima. La mayor parte de las tareas administrativas se realizarán directamente desde la base de datos de Supabase, evitando la necesidad de desarrollar un panel de administración.

## Objetivos del Proyecto

- Permitir a los vecinos consultar la disponibilidad de la pista.
- Permitir realizar reservas de forma rápida y sencilla.
- Permitir cancelar reservas propias.
- Informar a los vecinos mediante un sistema de notificaciones común.
- Minimizar la complejidad técnica y funcional.
- Optimizar el uso desde dispositivos móviles.

## Alcance

La aplicación gestionará exclusivamente:

- Una única pista de pádel.
- Un único usuario por vivienda.
- Un calendario de reservas de 7 días.
- Un sistema de alias configurable por cada usuario.
- Un sistema de notificaciones común para toda la comunidad.

## Tecnología

### Frontend
- Nuxt 3
- Vue 3
- TypeScript

### Backend
- Supabase

### Servicios utilizados
- Supabase Authentication
- Supabase Database
- Supabase Realtime

## Filosofía del Proyecto

- Simplicidad.
- Administración manual cuando sea más simple que automatizar.
- Mínima complejidad.
- Mobile First.

## Menú Principal

1. Notificaciones
2. Reservas
3. Mis reservas
4. Cambiar alias
5. Normas de uso
6. Acerca de
7. Salir

## Funcionalidades No Incluidas

- Panel de administración.
- Recuperación automática de contraseña.
- Cambio de contraseña.
- Registro automático de usuarios.
- Sistema de incidencias.
- Sistema de sanciones.
- Sistema de lectura de notificaciones.
- Histórico de reservas.
- Gestión de múltiples pistas.
- Navegación por semanas futuras.
