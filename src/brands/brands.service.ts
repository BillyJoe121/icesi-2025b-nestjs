// EXPLICACIÓN:
// El servicio se encarga de toda la lógica de negocio y la interacción con la base de datos para el módulo de marcas.

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class BrandsService {
  // Inyectamos el repositorio de Brand. TypeORM nos da este objeto 'brandRepository'
  // que ya tiene métodos para interactuar con la tabla 'brand' (find, save, create, etc.).
  constructor(
    @InjectRepository(Brand) private readonly brandRepository: Repository<Brand>
  ) { }

  create(createBrandDto: CreateBrandDto) {
    try {
      // Creamos una instancia de la entidad Brand con los datos del DTO.
      const brand = this.brandRepository.create(createBrandDto);
      // Guardamos la nueva instancia en la base de datos.
      // El hook @BeforeInsert de la entidad se ejecutará aquí para generar el slug.
      return this.brandRepository.save(brand);
    } catch (error) {
      // ERROR A EVITAR: Sería mejor manejar errores específicos, como la violación de la
      // restricción 'unique' para 'name' o 'slug', y devolver un BadRequestException (400).
      // Un InternalServerErrorException (500) es más para errores inesperados.
      throw new InternalServerErrorException('Error creating brand');
    }
  }

  findAll(pagination: PaginationDto) {
    // Extraemos 'limit' y 'offset' del DTO de paginación.
    const { limit, offset } = pagination;
    // Usamos las opciones 'take' (equivalente a LIMIT) y 'skip' (equivalente a OFFSET)
    // de TypeORM para obtener solo una "página" de resultados.
    return this.brandRepository.find({
      take: limit,
      skip: offset
    });
  }

  async findOne(term: string) {
    let brand: Brand | null;

    // Verificamos si el término de búsqueda es un UUID.
    if (isUUID(term)) {
      brand = await this.brandRepository.findOneBy({ id: term });
    } else {
      // Si no es un UUID, podría ser un 'name' o un 'slug'.
      // Usamos el 'QueryBuilder' para crear una consulta más compleja.
      const queryBuilder = this.brandRepository.createQueryBuilder('brand');
      brand = await queryBuilder
        // 'UPPER(name)=:name' hace la búsqueda del nombre insensible a mayúsculas/minúsculas.
        .where('UPPER(name)=:name or slug=:slug', {
          name: term.toUpperCase(),
          slug: term.toLowerCase(),
        })
        .getOne(); // .getOne() espera encontrar como máximo un resultado.
    }

    // Si después de buscar no encontramos la marca, lanzamos un error 404.
    if (!brand)
      throw new NotFoundException(`Brand with term "${term}" not found`);

    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    // `preload` es una función muy útil de TypeORM. Intenta cargar una entidad existente
    // desde la base de datos por su ID y luego fusiona los nuevos datos del DTO.
    // Si no encuentra la entidad, devuelve 'undefined'.
    const brand = await this.brandRepository.preload({
      id,
      ...updateBrandDto
    });

    if (!brand)
      throw new NotFoundException(`Brand with id ${id} not found`);

    // Guardamos la entidad actualizada. Si el 'slug' no se proporcionó, no se cambiará.
    // Si el nombre cambia pero no el slug, el hook @BeforeInsert NO se ejecuta en la actualización.
    // Si necesitas lógica similar para las actualizaciones, usarías el hook @BeforeUpdate.
    return this.brandRepository.save(brand);
  }

  async remove(id: string) {
    // Primero, buscamos la marca para asegurarnos de que existe.
    // El método findOne ya lanza un 404 si no la encuentra.
    const brand = await this.findOne(id);

    // `remove` elimina la entidad de la base de datos.
    return await this.brandRepository.remove(brand);
  }
}