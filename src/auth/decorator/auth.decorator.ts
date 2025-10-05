// EXPLICACIÓN:
// Este es un "Decorador Compuesto". Combina varios decoradores en uno solo para
// hacer nuestro código en el controlador más limpio y legible.

import { applyDecorators, UseGuards } from "@nestjs/common";
import { AppRoles } from "../interfaces/app-roles";
import { RoleProtected } from "./role-protected.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UserRoleGuard } from "../guards/user-role.guard";

// La función Auth recibe los roles permitidos.
export function Auth(...roles: AppRoles[]) {
    // applyDecorators toma todos los decoradores que le pases y los aplica como si
    // los hubieras puesto uno por uno sobre el método del controlador.
    return applyDecorators(
        // 1. Adjunta los metadatos de los roles a la ruta.
        RoleProtected(...roles),

        // 2. Aplica los guardias para proteger la ruta.
        //    - AuthGuard(): Valida que el JWT sea válido.
        //    - UserRoleGuard: Valida que el usuario tenga uno de los roles requeridos.
        //    El orden es importante: primero validamos el token, luego los roles.
        UseGuards(AuthGuard(), UserRoleGuard)
    )
}

// CÓMO SE USA:
// En lugar de escribir 3 líneas en el controlador:
// @UseGuards(AuthGuard(), UserRoleGuard)
// @RoleProtected(AppRoles.admin)
//
// Ahora solo escribimos una:
// @Auth(AppRoles.admin)