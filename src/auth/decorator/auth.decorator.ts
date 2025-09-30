import { applyDecorators, UseGuards } from "@nestjs/common";
import { AppRoles } from "../interfaces/app-roles";
import { RoleProtected } from "./role-protected.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UserRoleGuard } from "../guards/user-role.guard";

export function Auth(...roles: AppRoles[]){
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(),UserRoleGuard)
    )
}