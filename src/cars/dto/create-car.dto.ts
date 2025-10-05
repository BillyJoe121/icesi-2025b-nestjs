// ========================================================================================
// ARCHIVO: src/cars/dto/create-car.dto.ts
// PROPÓSITO: Definir la estructura y reglas de validación para los datos que se reciben
//            en el 'body' de una petición para CREAR un nuevo carro.
// ========================================================================================

import { IsInt, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateCarDto {
  // @IsString: Valida que el valor recibido para 'brand' sea de tipo string.
  // El cliente enviará el ID (o slug/nombre) de la marca como un string.
  // El 'message' personaliza el error si la validación falla.
  @IsString({ message: 'La marca debe ser una cadena de texto' })
  readonly brand: string;

  // @IsString: Valida que el modelo sea un string.
  // @MinLength(3): El modelo debe tener al menos 3 caracteres.
  // @MaxLength(20): El modelo no puede exceder los 20 caracteres.
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  readonly model: string;

  // @IsInt: Valida que el valor sea un número entero.
  // @Min(1900): El año debe ser 1900 o superior.
  // @Max(2020): El año debe ser 2020 o inferior.
  @IsInt({ message: 'El año debe ser un número entero entre 1900 y 2020' })
  @Min(1900)
  @Max(2020)
  readonly year: number;
}