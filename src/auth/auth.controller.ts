// EXPLICACIÓN:
// El controlador es la capa que maneja las peticiones HTTP entrantes.
// Su trabajo es recibir la petición, validar los datos (usando DTOs y Pipes),
// llamar al servicio apropiado para ejecutar la lógica y devolver una respuesta.

import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorator/get-user/get-user.decorator';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { AppRoles } from './interfaces/app-roles';
import { RoleProtected } from './decorator/role-protected.decorator';
import { Auth } from './decorator/auth.decorator';

// @Controller('auth') define que todas las rutas de este controlador empezarán con '/auth'.
// Ejemplo: POST /auth/register
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // Ruta para registrar un nuevo usuario.
  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  // Ruta para iniciar sesión.
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  // Ejemplo de una ruta protegida simple.
  // @UseGuards(AuthGuard()) aplica el guardia de autenticación por defecto (JWT).
  // Si el token no es válido o no existe, se denegará el acceso automáticamente.
  @Get('protected')
  @UseGuards(AuthGuard())
  testingPrivateRoute() {
    return 'Ruta protegida, ¡tienes un token válido!';
  }

  // Ejemplo de una ruta protegida por roles (la forma larga).
  @Get('protected1')
  // Se aplican dos guardias: AuthGuard para validar el token y UserRoleGuard para los roles.
  @UseGuards(AuthGuard(), UserRoleGuard)
  // Se adjunta la metadata de los roles permitidos.
  @RoleProtected(AppRoles.admin, AppRoles.user)
  // Usamos el decorador @GetUser para inyectar el usuario o una de sus propiedades.
  testingPrivateRoute1(@GetUser() user: User, @GetUser('email') email: string) {
    console.log({ user });
    return {
      message: `Ruta protegida para roles: admin o user.`,
      userEmail: email,
      userObject: user
    };
  }

  // Ejemplo de la misma ruta protegida, pero usando nuestro decorador compuesto @Auth (forma corta y limpia).
  @Get('protected2')
  @Auth(AppRoles.user) // ¡Mucho más simple!
  testingPrivateRoute2(@GetUser('email') email: string) {
    return {
      message: `Ruta protegida solo para rol: user.`,
      userEmail: email
    };
  }
}