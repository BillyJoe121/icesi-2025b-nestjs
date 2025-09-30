import { Injectable, UnauthorizedException } from '@nestjs/common';
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
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ){}

    createUser(createUserDto:CreateUserDto){
        try {
            const {password, ...userData} = createUserDto;
            const user = this.userRepository.create({
                            password: bcrypt.hashSync(password, 10),
                            ...userData
                        })
            return this.userRepository.save(user);
        } catch (error) {
            throw new Error('error creating user');
        }
    }

    async loginUser(loginUserDto:LoginUserDto){
        try {
            const {password, email} = loginUserDto;
            const user = await this.userRepository.findOne({
                            where: {email},
                            select: ['id', 'email', 'password', 'isActive', 'roles']
                        })
            if (!user || !bcrypt.compareSync(password, user.password))
                throw new UnauthorizedException('Invalid credentials'); 
                        
            return {
                user_id: user.id,
                email: user.email,
                roles: user.roles,
                isActive: user.isActive,
                token: this.jwtService.sign({user_id:user.id})
            };
        } catch (error) {
            throw new Error(error);
        }
    }    
}
