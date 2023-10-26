# Aplicación Web de Gestión de Tareas IonTask

#### URL: https://iontask.site/
#### URL API: https://api.iontask.site/api/v1/

Este proyecto permite a los usuarios registrados gestionar tareas. La aplicación tiene dos perfiles de usuario: Administrador y Ejecutor. Los principales aspectos del proyecto incluyen:

## Características

- **Inicio de Sesión de Usuario:** Los usuarios pueden iniciar sesión en la aplicación y se les asigna uno de dos perfiles: Administrador o Ejecutor.

### Perfil de Administrador

- **CRUD de Tareas:** Los administradores pueden realizar operaciones CRUD en las tareas. Cada tarea tiene los siguientes datos:
  - Título
  - Descripción
- Asignación de Tareas: Los administradores pueden asignar tareas a usuarios con perfil "Ejecutor".
- Restricciones en Actualización: No pueden eliminar o actualizar una tarea en un estado distinto a "Asignado".

### Perfil de Ejecutor

- **Visualización de Tareas Asignadas:** Los ejecutores pueden ver las tareas que se les han asignado y ver los detalles de cada tarea.

- **Cierre de Sesión de Usuario:** Los usuarios pueden cerrar sesión en la aplicación en cualquier momento.

## Tecnologías Utilizadas

- React
- React Router para el enrutamiento de la aplicación
- Axios para realizar solicitudes HTTP a la API
- Material-UI para la interfaz de usuario
- Autenticación de usuario con JWT

## Instalación

1. Clona el repositorio en tu máquina local.

```bash
git clone https://github.com/davidnherran/iontask-server.git
yarn install
