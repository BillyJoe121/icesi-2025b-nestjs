import { IsInt, IsOptional, IsString, Max, MaxLength, Min, MinLength, IsPositive } from 'class-validator';

export class UpdatePublisherDto {

    @IsString({ message: 'En nombre debe ser una cadena de texto' })
    @IsOptional()
    @MinLength(3)
    @MaxLength(20)
    name?: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @IsOptional()
    headquarters?: string;

    @IsInt({ message: 'El año debe estar entre 1980 y 2025' })
    @Min(1900)
    @Max(2025)
    @IsPositive()
    @IsOptional()
    foundationYear?: number;
}