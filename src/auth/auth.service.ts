// EXPLICACIÓN:
// El servicio contiene la lógica de negocio. Se encarga de las operaciones
// como crear un usuario, validar credenciales, generar tokens, etc.

import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        // Inyectamos el repositorio de User para interactuar con la base de datos.
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        // Inyectamos el servicio de JWT para crear los tokens.
        private readonly jwtService: JwtService
    ) { }

    createUser(createUserDto: CreateUserDto) {
        try {
            const { password, ...userData } = createUserDto;
            const user = this.userRepository.create({
                ...userData,
                // ¡IMPORTANTE! Hasheamos la contraseña antes de guardarla.
                // bcrypt.hashSync toma la contraseña y un 'salt' (número de rondas de hashing).
                // 10 es un valor común y seguro. Nunca guardes contraseñas en texto plano.
                password: bcrypt.hashSync(password, 10),
            });
            return this.userRepository.save(user);
        } catch (error) {
            // Aquí se debería manejar el error de forma más específica, por ejemplo,
            // si el email ya existe (error de constrain 'unique').
            throw new InternalServerErrorException('Error creating user', error);
        }
    }

    async loginUser(loginUserDto: LoginUserDto) {
        const { password, email } = loginUserDto;

        // Buscamos al usuario por su email.
        const user = await this.userRepository.findOne({
            where: { email },
            // Pedimos explícitamente los campos que necesitamos, incluyendo 'password',
            // que por defecto no se selecciona (recuerda el {select: false} en la entidad).
            select: ['id', 'email', 'password', 'isActive', 'roles']
        });

        // Comparamos la contraseña enviada con la hasheada en la BD.
        // bcrypt.compareSync hace esto de forma segura.
        if (!user || !bcrypt.compareSync(password, user.password)) {
            // Mensaje genérico para no dar pistas a atacantes.
            throw new UnauthorizedException('Invalid credentials');
        }

        // Si las credenciales son válidas, generamos el token.
        // El payload es la información que guardaremos dentro del token.
        // Es buena práctica guardar solo lo esencial, como el ID del usuario.
        const payload = { user_id: user.id };
        const token = this.jwtService.sign(payload);

        // Devolvemos la información relevante al cliente, incluyendo el token.
        return {
            user_id: user.id,
            email: user.email,
            roles: user.roles,
            isActive: user.isActive,
            token: token
        };
    }
}