import { IsOptional, IsString,Length,MaxLength, MinLength } from "class-validator";

export class CreateBrandDto {
    @IsString({message: "El nombre de la marca es obligatoria"})
    @MinLength(3)
    @MaxLength(20)
    readonly name: string;

    @IsOptional()
    @IsString()
    @Length(3,20)
    readonly slug?: string;
}
