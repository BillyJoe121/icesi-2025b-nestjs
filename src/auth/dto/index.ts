// EXPLICACIÓN:
// Este es un "archivo barril" (barrel file). Su única función es agrupar
// todas las exportaciones de este directorio para simplificar las importaciones en otros archivos.

// En lugar de:
// import { CreateUserDto } from './dto/create-user.dto';
// import { LoginUserDto } from './dto/login-user.dto';

// Podemos hacer:
// import { CreateUserDto, LoginUserDto } from './dto';

export * from "./create-user.dto";
export * from "./login-user.dto";