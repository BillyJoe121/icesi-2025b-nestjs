// ========================================================================================
// ARCHIVO: src/posts/dto/create-post.dto.ts
// PROPÓSITO: Validar los datos para crear una nueva Publicación.
// ========================================================================================

import { IsArray, IsString, MinLength } from "class-validator";

export class CreatePostDto {
    @IsString()
    @MinLength(5)
    title: string;

    @IsString()
    content: string;

    // Así representamos la relación en el DTO.
    // @IsArray(): Valida que 'tags' sea un arreglo.
    // @IsString({ each: true }): Valida que CADA elemento dentro del arreglo sea un string.
    @IsArray()
    @IsString({ each: true })
    tags: string[]; // Esperamos recibir algo como: "tags": ["nestjs", "typeorm", "backend"]
}