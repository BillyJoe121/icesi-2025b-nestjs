// EXPLICACIÓN:
// El módulo es el "pegamento" que une todas las piezas del feature de autenticación.
// Declara qué controladores, proveedores (servicios, estrategias, etc.) e importaciones necesita.

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController], // El controlador que maneja las rutas de este módulo.
  providers: [AuthService, JwtStrategy], // Los servicios y estrategias disponibles para inyección.
  imports: [
    ConfigModule, // Importamos ConfigModule para poder inyectar ConfigService.

    // TypeOrmModule.forFeature([User]) registra la entidad User dentro del alcance de este módulo.
    // Esto nos permite inyectar el repositorio de User (e.g., @InjectRepository(User)).
    TypeOrmModule.forFeature([User]),

    // PassportModule inicializa el sistema de autenticación de Passport.
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // JwtModule.registerAsync es la forma correcta de configurar el módulo JWT
    // cuando el 'secret' depende de algo que se carga asincrónicamente, como las variables de entorno.
    JwtModule.registerAsync({
      imports: [ConfigModule], // Le decimos que necesita el ConfigModule.
      inject: [ConfigService], // Le decimos que inyecte el ConfigService.
      // useFactory es una función que se ejecutará para crear la configuración.
      useFactory: (configService: ConfigService) => {
        return {
          // Obtenemos el secreto y la expiración de las variables de entorno.
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRES_IN')
          }
        };
      }
    })
  ],
})
export class AuthModule { }