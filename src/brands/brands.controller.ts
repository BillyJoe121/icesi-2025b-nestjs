// EXPLICACIÓN:
// El controlador define las rutas (endpoints) y qué método del servicio se ejecuta para cada una.

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

// Define el prefijo de la ruta para este controlador. Todas las rutas aquí comenzarán con '/brands'.
@Controller('brands')
export class BrandsController {
  // Inyectamos el servicio para poder usar sus métodos.
  constructor(private readonly brandsService: BrandsService) { }

  // @Post() define que este método manejará peticiones POST a '/brands'.
  // @Body() extrae el cuerpo de la petición y lo mapea a nuestro CreateBrandDto.
  // NestJS automáticamente aplicará las validaciones del DTO gracias al ValidationPipe global.
  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  // @Get() define que este método manejará peticiones GET a '/brands'.
  // @Query() extrae los parámetros de la URL (ej: /brands?limit=10&offset=5).
  // NestJS los mapea al PaginationDto.
  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.brandsService.findAll(pagination);
  }

  // @Get(':term') define una ruta con un parámetro dinámico.
  // Ej: /brands/toyota, /brands/123e4567-e89b-12d3-a456-426614174000
  // @Param('term') extrae el valor de ese parámetro.
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.brandsService.findOne(term);
  }

  // @Patch(':id') define una ruta para actualizaciones parciales.
  // @Param('id', ParseUUIDPipe) extrae el ID y usa el 'Pipe' ParseUUIDPipe
  // para validar que sea un UUID válido. Si no lo es, devuelve un error 400.
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(id, updateBrandDto);
  }

  // @Delete(':id') define la ruta para eliminar un recurso.
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.brandsService.remove(id);
  }
}