# Blueprint: Tienda de Gorras

## Visión General

Crear una tienda en línea visualmente atractiva para mostrar una colección de gorras. La aplicación contará con un diseño elegante y sofisticado que transmite una sensación de primera calidad y ofrecerá un sistema de autenticación de usuarios seguro, personalizado y fácil de usar.

## Diseño y Estilo

*   **Logo:** Se utilizará el logo de "Clubhouse Caps" con el cohete.
*   **Paleta de Colores:** Se utilizará una paleta de colores refinada sobre un fondo de modo oscuro, utilizando los colores del logo de una manera más sutil.
*   **Tipografía:** Se utilizará "Poppins" de Google Fonts para una apariencia limpia y moderna.
*   **Diseño:** Se utilizarán sombras suaves y profundas para crear una sensación de profundidad.

## Funcionalidades

### Autenticación y Perfiles de Usuario (Firebase)

*   **Integración:** Se utilizará Firebase Authentication para gestionar el registro e inicio de sesión y Cloud Firestore para almacenar datos adicionales del perfil.
*   **Datos de Registro:** El formulario de registro solicitará:
    *   Nombre y Apellidos (se almacenarán en el `displayName` del perfil de Firebase Auth).
    *   Celular (se almacenará en una colección `users` en Firestore).
    *   Email y Contraseña.
    *   **Confirmación de Contraseña.**
*   **Validación y Manejo de Errores:**
    *   Se validará que las contraseñas coincidan antes de enviar el formulario de registro.
    *   Se mostrará un mensaje de error específico si el correo electrónico ya está en uso (`El usuario ya está registrado`).
*   **Interfaz de Usuario:**
    *   Se creará una ventana modal para los formularios de "Iniciar sesión" y "Registrarse".
    *   **El modal tendrá un botón de cierre (X) en la esquina superior derecha.**
    *   La barra de navegación mostrará un botón "Iniciar sesión" que abrirá el modal.
    *   Una vez que el usuario inicie sesión, la barra mostrará su **nombre** (`displayName`) y un botón para "Cerrar sesión".
*   **Gestión de Estado:** Se utilizará un Svelte Store (`authStore`) para gestionar el estado de autenticación del usuario de forma reactiva en toda la aplicación.

## Plan de Implementación

### 1. Estructura del Proyecto

*   Se instalará la dependencia de `firebase` (que ya incluye Firestore).
*   Se actualizará el archivo de configuración `src/lib/firebase.ts` para inicializar Firestore.
*   Se actualizará el componente `src/lib/AuthModal.svelte` para incluir la confirmación de contraseña, el manejo de errores mejorado y el botón de cierre.
*   Se actualizará el componente `src/lib/Navbar.svelte` para mostrar el `displayName`.

### 2. Estilo y Diseño

*   Se adaptará el modal de autenticación para los nuevos campos y el botón de cierre.
