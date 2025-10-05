// EXPLICACIÓN:
// Este decorador NO protege la ruta. Su única función es AÑADIR METADATOS a una ruta.
// Los metadatos son información extra que asociamos a algo (en este caso, a un método del controlador).

import { SetMetadata } from "@nestjs/common";

// Exportamos la clave de los metadatos para usarla consistentemente en el Guard.
export const META_ROLES = 'roles';

// RoleProtected es una función que acepta una lista de roles (ej: 'admin', 'user')
// y devuelve el decorador SetMetadata.
export const RoleProtected = (...roles: string[]) => {
    // SetMetadata adjunta el arreglo de 'roles' bajo la clave META_ROLES a la ruta.
    return (SetMetadata(META_ROLES, roles));
}

// CÓMO SE CONECTA:
// 1. AuthController: Se usa así -> @RoleProtected(AppRoles.admin).
// 2. UserRoleGuard: Este guardia leerá estos metadatos para saber qué roles están permitidos.