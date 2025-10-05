// EXPLICACIÓN:
// DTO para actualizar una marca. Es muy común que al actualizar, no se envíen todos los campos,
// solo los que se quieren cambiar. Este DTO maneja eso de forma elegante.

import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto';

// La clase UpdateBrandDto hereda de PartialType(CreateBrandDto).
// `PartialType` es una utilidad de NestJS que toma un DTO existente (CreateBrandDto)
// y crea una nueva versión donde TODAS las propiedades son opcionales (@IsOptional()).
// Además, hereda todas las validaciones originales (@IsString, @MinLength, etc.).
// Esto nos ahorra tener que reescribir todas las propiedades con @IsOptional(). ¡Super útil!
export class UpdateBrandDto extends PartialType(CreateBrandDto) { }