// EXPLICACIÓN:
// DTO para el proceso de login. Solo necesitamos email y password.

import { IsString, Length } from "class-validator";

export class LoginUserDto {

    @IsString()
    @Length(3, 30)
    readonly email: string;

    // Nota que aquí no hay @Length. Podemos asumir que la validación
    // de la longitud de la contraseña no es necesaria en el login.
    @IsString()
    readonly password: string;
}