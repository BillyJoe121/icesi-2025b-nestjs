// EXPLICACIÓN:
// Un 'enum' (enumeración) es una forma de definir un conjunto de constantes con nombre.
// Usamos AppRoles para tener una fuente única y segura para los nombres de los roles.
// De esta manera, en lugar de escribir 'admin' como un string (lo que podría llevar a errores de tipeo),
// usamos AppRoles.admin. Si te equivocas al escribirlo, TypeScript te avisará.

export enum AppRoles {
    admin = 'admin',
    user = 'user',
    superuser = 'superuser'
}