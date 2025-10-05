// EXPLICACIÓN:
// Este módulo encapsula todo lo relacionado con 'Brands'.

import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';

@Module({
  // Los controladores que pertenecen a este módulo.
  controllers: [BrandsController],
  // Los proveedores (servicios) que pertenecen a este módulo.
  providers: [BrandsService],
  // Módulos que este módulo necesita importar.
  imports: [
    // Registra la entidad 'Brand' para que TypeORM la reconozca
    // y para que podamos inyectar su repositorio en BrandsService.
    TypeOrmModule.forFeature([Brand])
  ],
  // ¡IMPORTANTE PARA LA CONEXIÓN CON OTROS MÓDULOS!
  // Al exportar 'BrandsService', permitimos que otros módulos que importen 'BrandsModule'
  // puedan inyectar y usar 'BrandsService'.
  // Esto es exactamente lo que hacemos en el módulo de 'Cars' para validar que una marca exista.
  exports: [BrandsService],
})
export class BrandsModule { }