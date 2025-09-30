import { SetMetadata } from "@nestjs/common";

export const META_ROLES = 'roles';

export const RoleProtected = (...roles: string[]) => {
    return(SetMetadata(META_ROLES, roles)); 
} 