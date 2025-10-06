import { IsInt, IsString, Max, MaxLength, Min, MinLength, IsPositive } from 'class-validator';

export class CreatePublisherDto {

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  readonly name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  readonly headquarters: string;

  // @IsInt: Valida que el valor sea un número entero.
  // @Min(1900): El año debe ser 1900 o superior.
  // @Max(2020): El año debe ser 2020 o inferior.
  @IsInt({ message: 'El año debe ser un número entero entre 1900 y 2020' })
  @IsPositive()
  @Min(1900)
  @Max(2025)
  readonly foundationYear: number;
}