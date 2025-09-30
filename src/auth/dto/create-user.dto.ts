import { IsString, Length } from "class-validator";

export class CreateUserDto{
    @IsString()
    @Length(3,100)
    readonly firstname: string;

    @IsString()
    @Length(3,30)
    readonly email: string;

    @IsString()
    @Length(10,30)
    readonly password: string;    
}