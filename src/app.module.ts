// ========================================================================================
// ARCHIVO: src/app.module.ts
// PROPÓSITO: Servir como el módulo principal que ensambla todas las partes de la aplicación:
//            otros módulos, configuración global y conexión a la base de datos.
// ========================================================================================

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

@Module({
  // `imports` es donde se registran otros módulos y configuraciones globales.
  imports: [
    // 1. CONFIGURACIÓN DE VARIABLES DE ENTORNO
    // `ConfigModule.forRoot()` carga y parsea el archivo .env.
    // `isGlobal: true` hace que el `ConfigService` esté disponible en TODA la aplicación
    // sin necesidad de importar `ConfigModule` en cada módulo individual.
    ConfigModule.forRoot({ isGlobal: true }),

    // 2. CONFIGURACIÓN DE LA BASE DE DATOS
    // `TypeOrmModule.forRoot()` establece la conexión principal a la base de datos.
    TypeOrmModule.forRoot({
      type: 'postgres', // Tipo de base de datos.
      host: process.env.DB_HOST, // Leídos desde .env gracias a ConfigModule.
      port: parseInt(process.env.DB_PORT || '5432'), // Se convierte el puerto a número.
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      // `synchronize: true`: ¡MUY IMPORTANTE! En desarrollo, esto hace que TypeORM
      // compare tus entidades (`.entity.ts`) con la base de datos y la actualice
      // automáticamente (crea tablas, añade columnas, etc.).
      // ⚠️ ADVERTENCIA: NUNCA uses `synchronize: true` en producción, ya que podrías
      // perder datos. En producción se usan "migraciones".
      synchronize: true,

      // `entities`: Aquí le dices a TypeORM qué clases de entidad debe reconocer
      // para crear las tablas.
      entities: [Car, Brand, User],
    }),

    // 3. REGISTRO DE LOS MÓDULOS DE LA APLICACIÓN
    // Aquí importamos todos los módulos que hemos creado (Cars, Brands, Auth).
    // Al hacer esto, NestJS conoce sus controladores, servicios y relaciones.
    CarsModule,
    BrandsModule,
    AuthModule,
  ],
  // `controllers` y `providers` para el módulo raíz.
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }