import { IsInt, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class UpdateCarDto {
  @IsString({message: 'brand  debe ser una cadena de texto'})
  @IsOptional()
  brand: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @IsOptional()  
  model: string;

  @IsInt({message: 'el año debe estar entre 1980 y 2020'})
  @Min(1900)
  @Max(2020)
  @IsOptional()  
  year: number;
}
