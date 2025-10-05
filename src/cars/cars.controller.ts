// ========================================================================================
// ARCHIVO: src/cars/cars.controller.ts
// PROPÓSITO: Definir los endpoints (rutas) para el recurso 'cars' y manejar las
//            peticiones y respuestas HTTP. Actúa como intermediario entre el cliente y el servicio.
// ========================================================================================

import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

// @Controller('cars'): Declara que todas las rutas en esta clase comenzarán con el prefijo '/cars'.
@Controller('cars')
export class CarsController {
  // Inyectamos el 'CarsService' para poder usar sus métodos.
  constructor(private readonly carService: CarsService) { }

  // Maneja las peticiones GET a '/cars'.
  @Get()
  getAll() {
    return this.carService.getAll();
  }

  // Maneja las peticiones GET a '/cars/:id' (ej: /cars/123e4567...).
  // @Param('id', ParseUUIDPipe):
  // - @Param('id'): Extrae el parámetro 'id' de la URL.
  // - ParseUUIDPipe: Es un "Pipe" que valida automáticamente que el 'id' recibido sea un UUID válido.
  //   Si no lo es, NestJS responde con un error 400 Bad Request antes de que el método se ejecute.
  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.carService.getById(id);
  }

  // Maneja las peticiones PATCH a '/cars/:id'. Se usa para actualizaciones parciales.
  // @Body(): Extrae el cuerpo de la petición y lo valida contra el 'UpdateCarDto'.
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() car: UpdateCarDto) {
    return this.carService.update(id, car);
  }

  // Maneja las peticiones DELETE a '/cars/:id'.
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.carService.delete(id);
  }

  // Maneja las peticiones POST a '/cars'.
  // @Body(): Extrae el cuerpo y lo valida contra el 'CreateCarDto'.
  @Post()
  create(@Body() car: CreateCarDto) {
    return this.carService.create(car);
  }
}