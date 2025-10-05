// ========================================================================================
// ARCHIVO: src/cars/cars.service.ts
// PROPÓSITO: Implementar toda la lógica de negocio (CRUD) para la entidad 'Car'.
//            Este servicio se comunica con la base de datos y también con otros servicios.
// ========================================================================================

import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './entities/car.entity';
import { UpdateCarDto } from './dto/update-car.dto';
import { BrandsService } from 'src/brands/brands.service'; // <--- CONEXIÓN EXTERNA

@Injectable()
export class CarsService {

  constructor(
    // Inyección del Repositorio: NestJS, gracias a `TypeOrmModule.forFeature([Car])` en el módulo,
    // nos provee un objeto `carRepository` con métodos para interactuar con la tabla `car`.
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,

    // Inyección de otro Servicio: NestJS nos provee la instancia de `BrandsService` porque
    // `CarsModule` importó `BrandsModule`. Esto es la base de la arquitectura modular.
    private readonly brandService: BrandsService,
  ) { }

  // Lógica para obtener todos los carros.
  getAll(): Promise<Car[]> {
    // `find()` sin argumentos trae todos los registros de la tabla.
    return this.carRepository.find();
  }

  // Lógica para obtener un carro por su ID.
  async getById(id: string): Promise<Car> {
    const car = await this.carRepository.findOneBy({ id });

    // Si `findOneBy` no encuentra nada, devuelve `null`. Es CRUCIAL manejar este caso.
    if (car === null) {
      // Lanzamos una excepción `NotFoundException` que NestJS convierte en una respuesta HTTP 404.
      throw new NotFoundException(`Car with id: "${id}" not found`);
    }

    return car;
  }

  // Lógica para crear un nuevo carro.
  async create(createCarDto: CreateCarDto): Promise<Car> {
    // 1. VALIDAR LA RELACIÓN: Antes de crear el carro, verificamos que la marca enviada existe.
    //    Delegamos esta responsabilidad al `BrandsService`, que es el experto en marcas.
    const brand = await this.brandService.findOne(createCarDto.brand);
    //    (El `findOne` de `BrandsService` ya lanza un 404 si no encuentra la marca,
    //    así que la ejecución se detendría aquí si la marca no es válida).

    // 2. CREAR LA ENTIDAD: Usamos `create` del repositorio para crear una instancia de la entidad `Car`.
    //    Esto todavía no guarda nada en la base de datos.
    const carNew: Car = this.carRepository.create({
      ...createCarDto,
      brand: brand, // Asignamos el objeto `Brand` completo que obtuvimos.
    });

    // 3. GUARDAR EN LA BD: `save` toma la instancia y la inserta en la base de datos.
    return this.carRepository.save(carNew);
  }

  // Lógica para actualizar un carro.
  async update(id: string, updateCarDto: UpdateCarDto): Promise<Car> {
    // 1. CARGAR Y FUSIONAR: `preload` es ideal para actualizaciones. Busca el carro por `id`,
    //    y si lo encuentra, fusiona los datos del `updateCarDto` sobre la entidad encontrada.
    //    Si no encuentra el carro, devuelve `undefined`.
    const car = await this.carRepository.preload({
      id: id,
      ...updateCarDto,
    });

    if (!car) {
      throw new NotFoundException(`Car with id: ${id} not found`);
    }

    // 2. VALIDAR LA RELACIÓN (SI CAMBIA): Si el DTO incluye una nueva marca,
    //    debemos validar que esa nueva marca también exista.
    if (updateCarDto.brand) {
      const brand = await this.brandService.findOne(updateCarDto.brand);
      car.brand = brand; // Asignamos la nueva entidad de marca al carro.
    }

    // 3. GUARDAR CAMBIOS: `save` detecta que la entidad ya tiene un ID y ejecuta una
    //    operación de actualización (UPDATE) en lugar de una inserción (INSERT).
    return this.carRepository.save(car);
  }

  // Lógica para eliminar un carro.
  async delete(id: string): Promise<Car> {
    // Primero, obtenemos el carro para asegurarnos de que existe y para poder devolverlo como confirmación.
    const car = await this.getById(id);

    // `delete` elimina el registro de la base de datos por su ID.
    await this.carRepository.delete(id);

    return car; // Devolvemos la entidad que fue eliminada.
  }
}