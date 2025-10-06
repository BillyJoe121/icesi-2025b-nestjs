import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Publisher } from './entities/publisher.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PublishersService {

    constructor(
    @InjectRepository(Publisher) private readonly publisherRepository: Repository<Publisher>
  ) { }

  create(createPublisherDto: CreatePublisherDto) {
    try {

        const publisher = this.publisherRepository.create(createPublisherDto);
      // Guardamos la nueva instancia en la base de datos.
      // El hook @BeforeInsert de la entidad se ejecutará aquí para generar el headquarters.
      return this.publisherRepository.save(publisher);
    } catch (error) {
      // ERROR A EVITAR: Sería mejor manejar errores específicos, como la violación de la
      // restricción 'unique' para 'name' o 'headquarters', y devolver un BadRequestException (400).
      // Un InternalServerErrorException (500) es más para errores inesperados.
      throw new InternalServerErrorException('Error creating publisher');
    }
  }

  findAll(pagination: PaginationDto) {
    // Extraemos 'limit' y 'offset' del DTO de paginación.
    const { limit, offset } = pagination;
    // Usamos las opciones 'take' (equivalente a LIMIT) y 'skip' (equivalente a OFFSET)
    // de TypeORM para obtener solo una "página" de resultados.
    return this.publisherRepository.find({
      take: limit,
      skip: offset
    });
  }

  async findOne(term: string) {
    let publisher: Publisher | null;

    // Verificamos si el término de búsqueda es un UUID.
    if (isUUID(term)) {
      publisher = await this.publisherRepository.findOneBy({ id: term });
    } else {
      // Si no es un UUID, podría ser un 'name' o un 'headquarters'.
      // Usamos el 'QueryBuilder' para crear una consulta más compleja.
      const queryBuilder = this.publisherRepository.createQueryBuilder('publisher');
      publisher = await queryBuilder
        // 'UPPER(name)=:name' hace la búsqueda del nombre insensible a mayúsculas/minúsculas.
        .where('UPPER(name)=:name or headquarters=:headquarters', {
          name: term.toUpperCase(),
          headquarters: term.toLowerCase(),
        })
        .getOne(); // .getOne() espera encontrar como máximo un resultado.
    }

    if (!publisher)
      throw new NotFoundException(`Publisher with term "${term}" not found`);

    return publisher;
  }

  async update(id: string, updatePublisherDto: UpdatePublisherDto) {

    const publisher = await this.publisherRepository.preload({
      id,
      ...updatePublisherDto
    });

    if (!publisher)
      throw new NotFoundException(`Publisher with id ${id} not found`);

    return this.publisherRepository.save(publisher);
  }

  async remove(id: string) {

    const publisher = await this.findOne(id);

    return await this.publisherRepository.remove(publisher);
  }
}
