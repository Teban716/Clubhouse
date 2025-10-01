# Blueprint de la Aplicación Clubhouse Caps

## Visión General

Esta aplicación es una plataforma para mostrar y vender gorras exclusivas. Cuenta con un sistema de autenticación de usuarios y roles (Administrador y Usuario). Los administradores pueden añadir nuevos productos al catálogo, mientras que los usuarios pueden ver los productos disponibles.

## Características y Diseño Implementados

- **Autenticación de Usuarios:**
  - Flujo completo de registro e inicio de sesión con Firebase Authentication.
  - Formulario en una ventana modal con cambio dinámico entre "Iniciar sesión" y "Registrarse".
  - Campos de registro: Nombre, Apellidos, Celular, Email y Contraseña.
  - Almacenamiento de datos adicionales (celular) en Firestore.
  - Validación de errores (contraseñas no coinciden, email en uso).
- **Diseño del Modal de Autenticación:**
  - Interfaz oscura y moderna con detalles en violeta y cian.
  - Totalmente accesible, permitiendo el cierre con la tecla `Escape` y haciendo clic fuera del modal.
  - Botón de cierre explícito (X).
- **Barra de Navegación Reactiva:**
  - Muestra el nombre del usuario y un botón de "Cerrar sesión" cuando el usuario está autenticado.
  - Muestra "Iniciar sesión" en caso contrario.
- **Estructura de Stores de Svelte:**
  - `authStore`: Gestiona el estado del usuario (`authUser`).
  - `uiStore`: Gestiona el estado de la UI, como la visibilidad del modal (`isAuthModalOpen`).

## Plan para la Implementación Actual: Roles y Productos

**1. Configuración del Backend y Creación del Admin**

*   **Instalar Firebase Admin SDK:** Instalar `firebase-admin` para un script de creación de admin.
*   **Crear Script de "Seeding":** Crear `scripts/seedAdmin.js` para:
    1.  Crear el usuario `admin@gmail.com`.
    2.  Asignarle el Custom Claim `{ admin: true }`.
*   **Actualizar Reglas de Seguridad de Firestore:** Modificar `firestore.rules` para que solo los admins puedan escribir en la colección `products`.

**2. Creación de la Interfaz de Administrador**

*   **Nuevo Componente `AdminDashboard.svelte`:**
    *   Formulario para añadir productos (nombre, descripción, precio, URL de imagen).
    *   Lógica para crear documentos en la colección `products` de Firestore.

**3. Creación de la Interfaz para Usuarios**

*   **Nuevo Componente `ProductList.svelte`:**
    *   Mostrará los productos de la colección `products` en tiempo real.
    *   Diseño de tarjetas para cada producto.

**4. Integración en la Aplicación Principal (`App.svelte`)**

*   **Lógica de Roles:**
    1.  Comprobar los Custom Claims del usuario al iniciar sesión.
    2.  Mostrar `AdminDashboard.svelte` si el usuario es admin.
    3.  Mostrar `ProductList.svelte` en caso contrario.
*   **Actualizar `authStore`:** Añadir una variable para el estado de administrador.
