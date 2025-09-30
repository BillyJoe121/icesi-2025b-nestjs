import { IsString, Length } from "class-validator";

export class LoginUserDto{

    @IsString()
    @Length(3,30)
    readonly email: string;

    @IsString()
    readonly password: string;    
}