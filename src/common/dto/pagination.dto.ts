// ========================================================================================
// ARCHIVO: src/common/dto/pagination.dto.ts
// PROPÓSITO: Definir un DTO reutilizable para los parámetros de consulta (query params)
//            de paginación, como `limit` y `offset`.
// ========================================================================================

import { Type } from "class-transformer"; // Herramienta para transformar datos.
import { IsOptional, IsPositive } from "class-validator";

export class PaginationDto {
  @IsOptional() // El campo no es obligatorio.
  @IsPositive() // Valida que el número sea positivo (mayor que 0).

  // ¡TRANSFORMACIÓN IMPORTANTE!
  // @Type(() => Number): Los parámetros de una URL (`?limit=10`) siempre llegan como
  // strings ("10"). El `ValidationPipe` necesita que sean números para poder usar `@IsPositive`.
  // Este decorador le dice a NestJS que intente convertir el valor entrante a un `Number`.
  // ⚠️ ERROR COMÚN: Olvidar `@Type(() => Number)`. Si lo omites, la validación `@IsPositive`
  // fallará porque intentará aplicarse sobre un string.
  @Type(() => Number)
  limit?: number; // Cantidad de elementos a traer.

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  offset?: number; // Posición desde la cual empezar a traer elementos.
}