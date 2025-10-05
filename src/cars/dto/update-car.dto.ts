// ========================================================================================
// ARCHIVO: src/cars/dto/update-car.dto.ts
// PROPÓSITO: Definir la estructura y reglas para ACTUALIZAR un carro. La clave aquí
//            es que todos los campos son opcionales.
// ========================================================================================

import { IsInt, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

// NOTA: Este DTO define las propiedades manualmente. Una alternativa más limpia sería usar
// `export class UpdateCarDto extends PartialType(CreateCarDto) {}`
// del paquete '@nestjs/mapped-types', que hace lo mismo automáticamente. Ambas formas funcionan.

export class UpdateCarDto {
  // @IsOptional(): Esta es la diferencia clave con el CreateCarDto.
  // Significa que el cliente NO está obligado a enviar este campo en el body de la petición PATCH.
  // Si lo envía, se aplican las demás validaciones (@IsString).
  @IsString({ message: 'La marca debe ser una cadena de texto' })
  @IsOptional()
  brand?: string; // El '?' indica a TypeScript que la propiedad es opcional.

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @IsOptional()
  model?: string;

  @IsInt({ message: 'El año debe estar entre 1980 y 2020' })
  @Min(1900)
  @Max(2020)
  @IsOptional()
  year?: number;
}