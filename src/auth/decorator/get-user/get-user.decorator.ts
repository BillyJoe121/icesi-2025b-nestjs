// EXPLICACIÓN:
// Este es un decorador de parámetro personalizado. Su objetivo es extraer el objeto 'user'
// (que fue inyectado en la petición por nuestra estrategia de JWT) y pasarlo como un
// argumento a nuestro método del controlador.

import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const GetUser = createParamDecorator(
    // 'data' es lo que pasas como argumento al decorador. Ej: @GetUser('email') -> data = 'email'.
    // 'ctx' (ExecutionContext) es el contexto de la petición actual.
    (data: string, ctx: ExecutionContext) => {

        // Obtenemos el objeto de la petición (request).
        const req = ctx.switchToHttp().getRequest();

        // La estrategia de JWT (JwtStrategy) ya validó el token y adjuntó el usuario a 'req.user'.
        const user = req.user;

        // Si por alguna razón el usuario no está en la petición (ej: se usó el decorador
        // en una ruta no protegida), lanzamos un error.
        if (!user)
            throw new InternalServerErrorException('User not found (request)');

        // Si se pasó 'data' (ej: 'email'), devolvemos solo esa propiedad del usuario.
        // Si no, devolvemos el objeto de usuario completo.
        return (!data) ? user : user[data];
    }
);

// CÓMO SE CONECTA:
// 1. JwtStrategy: El método 'validate' de esta clase debe devolver un objeto 'user'.
//    Ese objeto es el que se adjunta a 'req.user'.
// 2. AuthController: Se usa así -> testingPrivateRoute1(@GetUser() user: User)