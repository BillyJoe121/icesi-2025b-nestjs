import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

// Define el prefijo de la ruta para este controlador. Todas las rutas aquí comenzarán con '/publishers'.
@Controller('publishers')
export class PublishersController {

    constructor(private readonly publishersService: PublishersService) { }

  @Post()
  create(@Body() createPublisherDto: CreatePublisherDto) {
    return this.publishersService.create(createPublisherDto);
  }


  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.publishersService.findAll(pagination);
  }

  
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.publishersService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updatePublisherDto: UpdatePublisherDto) {
    return this.publishersService.update(id, updatePublisherDto);
  }


  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.publishersService.remove(id);
  }
}