import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsModule } from './brands/brands.module';
import { AuthModule } from './auth/auth.module';
import { Car } from './cars/entities/car.entity';
import { Brand } from './brands/entities/brand.entity';
import { User } from './auth/entities/user.entity';
import { PublisherModule } from './publishers/publishers.module';
import { Publisher } from './publishers/entities/publisher.entity';

@Module({

  imports: [

    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres', // Tipo de base de datos.
      host: process.env.DB_HOST, // Leídos desde .env gracias a ConfigModule.
      port: parseInt(process.env.DB_PORT || '5432'), // Se convierte el puerto a número.
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      synchronize: true,

      entities: [Car, Brand, User, Publisher],
    }),

    CarsModule,
    BrandsModule,
    AuthModule,
    PublisherModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }