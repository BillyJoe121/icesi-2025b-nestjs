// EXPLICACIÓN:
// Este es un DTO (Data Transfer Object). Define la estructura y las reglas de validación
// para los datos que se reciben al crear un nuevo usuario.

import { IsString, Length } from "class-validator";

export class CreateUserDto {
    // @IsString() asegura que el valor de 'firstname' sea un string.
    // @Length(3, 100) asegura que el string tenga entre 3 y 100 caracteres.
    // 'readonly' es una buena práctica para DTOs, ya que indica que estas propiedades
    // no deberían ser modificadas después de su creación.
    @IsString()
    @Length(3, 100)
    readonly firstname: string;

    @IsString()
    @Length(3, 30)
    readonly email: string;

    @IsString()
    @Length(10, 30)
    readonly password: string;
}
// CÓMO SE CONECTA:
// 1. AuthController: En el método `createUser`, el decorador `@Body()` usa esta clase.
// 2. main.ts: El `ValidationPipe` global intercepta la petición, ve que el tipo esperado es `CreateUserDto`,
//    y automáticamente ejecuta las validaciones (@IsString, @Length). Si alguna falla, devuelve un error 400 Bad Request.