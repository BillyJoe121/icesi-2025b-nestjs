// ========================================================================================
// ARCHIVO: src/cars/cars.module.ts
// PROPÓSITO: Empaquetar y organizar todos los componentes relacionados con los carros
//            (controlador, servicio, entidad) y declarar sus dependencias con otros módulos.
// ========================================================================================

import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { BrandsModule } from 'src/brands/brands.module'; // <--- DEPENDENCIA EXTERNA

@Module({
  // Los controladores que pertenecen a este módulo.
  controllers: [CarsController],
  // Los proveedores (servicios) que este módulo define y que pueden ser inyectados.
  providers: [CarsService],
  // Lista de módulos que este módulo necesita.
  imports: [
    // 1. `TypeOrmModule.forFeature([Car])`: Hace que la entidad 'Car' y su repositorio
    //    estén disponibles para ser inyectados DENTRO de este módulo (en `CarsService`).
    TypeOrmModule.forFeature([Car]),

    // 2. `BrandsModule`: Al importar este módulo, hacemos que todos los proveedores
    //    que `BrandsModule` haya EXPORTADO (en nuestro caso, `BrandsService`) estén
    //    disponibles para ser inyectados en los proveedores de `CarsModule`.
    //    Esta es la línea que permite que `CarsService` pueda usar `BrandsService`.
    BrandsModule
  ]
})
export class CarsModule { }