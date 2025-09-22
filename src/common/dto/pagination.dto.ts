import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationDto {
    
    @IsOptional()
    @IsPositive()
    @Type(()=>Number)
    limit?: number; // cantidad de elementos a traer

    @IsOptional()
    @IsPositive()
    @Type(()=>Number)    
    offset?: number; // posición en que inicia
}