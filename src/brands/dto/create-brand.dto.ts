// EXPLICACIÓN:
// DTO para la creación de una nueva marca. Define los campos requeridos y sus validaciones.

import { IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator";

export class CreateBrandDto {
    // @IsString valida que el 'name' sea un string. El 'message' personaliza el error.
    @IsString({ message: "El nombre de la marca es obligatoria" })
    @MinLength(3) // Debe tener al menos 3 caracteres.
    @MaxLength(20) // No puede tener más de 20.
    readonly name: string;

    // @IsOptional() indica que el campo 'slug' no es obligatorio.
    // Si el cliente no lo envía, no habrá error de validación.
    @IsOptional()
    @IsString()
    @Length(3, 20)
    readonly slug?: string; // El '?' hace que la propiedad sea opcional en TypeScript.
}