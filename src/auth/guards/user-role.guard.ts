// EXPLICACIÓN:
// Un "Guard" es una clase que determina si una petición puede continuar o no.
// Este guardia en particular verifica si el usuario tiene los roles necesarios.

import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { User } from "../entities/user.entity";

@Injectable()
export class UserRoleGuard implements CanActivate {

    // Inyectamos 'Reflector', una clase de NestJS que nos permite LEER los metadatos
    // que fueron establecidos por decoradores como @SetMetadata o nuestro @RoleProtected.
    constructor(
        private readonly reflector: Reflector
    ) { }

    canActivate(context: ExecutionContext): boolean {
        // 1. Leer los metadatos de la ruta.
        //    Buscamos la metadata con la clave 'roles' (nuestro META_ROLES) en el handler (método) actual.
        const validRoles: string[] = this.reflector.get<string[]>(META_ROLES, context.getHandler());

        // Si la ruta no tiene metadatos de roles, no necesita validación de rol. Permitimos el paso.
        if (!validRoles || validRoles.length === 0)
            return true;

        // 2. Obtener el usuario de la petición.
        const request = context.switchToHttp().getRequest();
        const user: User = request.user as User;

        if (!user)
            throw new BadRequestException("user not found");

        // 3. Comparar los roles del usuario con los roles válidos.
        //    Iteramos sobre los roles que tiene el usuario.
        for (const role of user.roles) {
            // Si alguno de los roles del usuario está en la lista de roles permitidos...
            if (validRoles.includes(role)) {
                return true; // ...permitimos el acceso.
            }
        }

        // Si el bucle termina y no encontramos ninguna coincidencia, el usuario no tiene el rol necesario.
        throw new ForbiddenException("user doesn't have required role");
    }
}