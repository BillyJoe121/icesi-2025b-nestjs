// EXPLICACIÓN:
// Esta es la "estrategia" que usará Passport para validar los JSON Web Tokens (JWT).
// Su principal trabajo es:
// 1. Extraer el token de la petición.
// 2. Verificar que la firma del token sea válida usando el 'secret'.
// 3. Tomar el 'payload' (contenido) del token decodificado.
// 4. Validar el payload (ej. buscar el usuario en la BD).
// 5. Devolver el usuario, que será adjuntado al objeto `request`.

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { // Extendemos de la estrategia JWT de Passport
  constructor(
    private readonly configService: ConfigService, // Para leer variables de entorno
    @InjectRepository(User) private readonly userRepository: Repository<User> // Para acceder a la BD
  ) {
    // En el constructor 'super', configuramos la estrategia.
    super({
      // Le decimos de dónde extraer el token. 'fromAuthHeaderAsBearerToken' busca el
      // token en el header 'Authorization' con el formato 'Bearer <token>'.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // No ignorar la expiración del token. Si el token ha expirado, será rechazado.
      ignoreExpiration: false,
      // La clave secreta para verificar la firma del token. ¡NUNCA la pongas directamente aquí!
      // La leemos desde las variables de entorno para mayor seguridad.
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  // ¡ESTE MÉTODO ES CLAVE!
  // Una vez que Passport verifica que el token es válido y no ha expirado,
  // llama a este método 'validate' y le pasa el payload decodificado del token.
  async validate(payload: { user_id: string }) {
    const { user_id } = payload;
    const user = await this.userRepository.findOneBy({ id: user_id });

    if (!user)
      throw new UnauthorizedException('User does not exist');

    if (!user.isActive)
      throw new UnauthorizedException('Inactive user');

    // Lo que sea que retornemos aquí, Passport lo adjuntará al objeto `request`.
    // Por ejemplo, `request.user` será este objeto 'user'.
    // ERROR COMÚN: Olvidar retornar el usuario o retornar 'null'. Si haces eso,
    // `request.user` será indefinido y los guardias y decoradores fallarán.
    return user;
  }
}