# 04 - Authentication

## Objetivo

Este documento define el sistema de autenticación de la aplicación Jardines de Hércules II - Pista de Pádel.

La autenticación será gestionada mediante Supabase Authentication.

---

# Proveedor de autenticación

La aplicación utilizará:

```text
Supabase Auth
```

Método:

```text
Email + Contraseña
```

No se utilizarán proveedores externos:

- Google
- Facebook
- Apple
- GitHub

---

# Registro de usuarios

## Creación de cuentas

Los usuarios no pueden registrarse directamente desde la aplicación.

La creación de cuentas será siempre manual.

## Proceso

El vecino deberá contactar con el presidente de la comunidad.

Facilitará:

- Escalera
- Planta
- Puerta
- Email

Si la solicitud es aprobada:

1. El administrador crea el usuario en Supabase Auth.
2. El administrador crea el registro correspondiente en la tabla profiles.
3. Se genera una contraseña inicial aleatoria.

---

# Inicio de sesión

## Datos requeridos

El usuario deberá introducir:

- Email
- Contraseña

## Validación

La validación será realizada por Supabase Authentication.

---

# Persistencia de sesión

## Comportamiento

La sesión permanecerá abierta de forma indefinida.

El usuario no tendrá que iniciar sesión nuevamente cada vez que abra la aplicación.

La sesión finalizará únicamente cuando:

- El usuario pulse "Salir".
- El usuario sea deshabilitado por el administrador.
- La sesión expire por causas propias de Supabase.

---

# Cierre de sesión

## Menú

El menú lateral incluirá la opción:

```text
Salir
```

## Comportamiento

Al pulsar:

```text
Salir
```

Se ejecutará:

```text
supabase.auth.signOut()
```

Posteriormente:

- Se eliminará la sesión local.
- Se redirigirá al Login.

---

# Recuperación de contraseña

## Funcionalidad

No existe recuperación automática de contraseña.

## Pantalla Login

Se mostrará:

```text
¿Olvidaste tu contraseña?
```

## Comportamiento

Al pulsar:

```text
¿Olvidaste tu contraseña?
```

Se mostrará un mensaje informativo:

```text
Contacte con el presidente de la comunidad para recuperar su acceso.
```

No se enviarán correos automáticos.

---

# Cambio de contraseña

## Funcionalidad

No existe pantalla de cambio de contraseña.

## Gestión

Si fuera necesario modificar una contraseña:

- El administrador lo realizará manualmente desde Supabase.

---

# Usuario deshabilitado

## Campo utilizado

Tabla:

```text
profiles
```

Campo:

```text
active
```

## Valor

```text
true
```

Usuario habilitado.

```text
false
```

Usuario deshabilitado.

---

## Comprobación

La aplicación verificará periódicamente el valor:

```text
active
```

del usuario autenticado.

---

## Comportamiento

Si:

```text
active = false
```

entonces:

1. Se cerrará automáticamente la sesión.
2. Se ejecutará signOut().
3. Se redirigirá al Login.
4. Se mostrará el mensaje:

```text
Su acceso ha sido deshabilitado. Contacte con el presidente de la comunidad.
```

---

# Gestión del Email

## Almacenamiento

El email vive exclusivamente en:

```text
auth.users
```

No se almacenará una copia en:

```text
profiles
```

---

# Relación Auth / Profiles

## Estructura

```text
auth.users
    │
    ▼
profiles
```

## Clave

```text
profiles.id
```

será:

```text
auth.users.id
```

---

# Seguridad

## Acceso a perfiles

Cada usuario únicamente podrá acceder a:

- Su propio perfil.
- Sus propias reservas.

## Notificaciones

Las notificaciones son públicas para todos los usuarios autenticados.

## Reservas

Los usuarios únicamente podrán:

- Crear reservas propias.
- Cancelar reservas propias.

No podrán modificar reservas de otros usuarios.

---

# Funcionalidades Excluidas

No forman parte del proyecto:

- Registro público.
- Verificación por email.
- Recuperación automática de contraseña.
- Cambio de contraseña.
- Login social.
- MFA.
- Roles complejos.
- Gestión de permisos avanzada.
