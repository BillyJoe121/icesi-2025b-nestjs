import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { User } from "../entities/user.entity";

@Injectable()
export class UserRoleGuard implements CanActivate{

    constructor(
        private readonly reflector: Reflector
    ){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const validRoles: string [] = this.reflector.get<string[]>('roles', context.getHandler());

        if(!validRoles || validRoles.length === 0)
            return true; 

        const request = context.switchToHttp().getRequest();
        const user: User = request.user as User; 

        if(!user)
            throw new BadRequestException("user not found"); 

        for(const role of user.roles){
            if(validRoles.includes(role))
                return true;
        }

        // console.log(validRoles); 

        throw new ForbiddenException("user doesn't have required role");
    }
}