import { Body, Controller, Get, Post, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorator/get-user/get-user.decorator';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { AppRoles } from './interfaces/app-roles';
import { RoleProtected } from './decorator/role-protected.decorator';
import { Auth } from './decorator/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto){
    return this.authService.createUser(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto){
    return this.authService.loginUser(loginUserDto);
  }

  @UseGuards(AuthGuard())
  @Get('protected')
  testingPrivateRoute(){
    return 'Ruta protegida';
  }

  @UseGuards(AuthGuard(), UserRoleGuard)
  @Get('protected1')
  //@SetMetadata('roles',[AppRoles.admin, AppRoles.user])
  @RoleProtected(AppRoles.admin, AppRoles.user)
  testingPrivateRoute1(@Req() request: Request, @GetUser() user: User, @GetUser('email') email: string){
    //console.log(request);
    console.log(user);
    return `Ruta protegida ${email}`;
  }

  @Get('protected2')
  @Auth(AppRoles.user)
  testingPrivateRoute2(@Req() request: Request, @GetUser('email') email: string){
    //console.log(request);
    return `Ruta protegida ${email}`;
  }

}
