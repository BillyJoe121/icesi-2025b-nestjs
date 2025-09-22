import { IsInt, IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateCarDto {
  @IsString({message: 'brand  debe ser una cadena de texto'})
  readonly brand: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  readonly model: string;

  @IsInt({message: 'el año debe estar entre 1980 y 2020'})
  @Min(1900)
  @Max(2020)
  readonly year: number;
}
