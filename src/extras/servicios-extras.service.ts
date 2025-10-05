// ========================================================================================
// ARCHIVO: servicios-extras.service.ts
// PROPÓSITO: Implementar la lógica de negocio para los requerimientos avanzados.
//            Este archivo es tu "chuleta" o "acordeón" para el examen.
// CÓMO USARLO: Copia y pega los métodos que necesites en el servicio correspondiente
//              (ej: los métodos de carros en `CarsService`), y asegúrate de inyectar
//              los repositorios necesarios en el constructor.
// ========================================================================================

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Car } from '../cars/entities/car.entity';
import { Brand } from '../brands/entities/brand.entity';
import { User } from '../auth/entities/user.entity';
import { Book } from './entities/book.entity'; // Entidades del archivo anterior
import { Author } from './entities/author.entity'; // Entidades del archivo anterior
import { FilterBooksDto, CarYearRangeDto, AssignAuthorDto, AddFeaturesDto } from './dto/extras.dto'; // DTOs del archivo anterior

@Injectable()
export class ExtrasService {
  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    @InjectRepository(Brand) private readonly brandRepository: Repository<Brand>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author) private readonly authorRepository: Repository<Author>,
  ) {}

  // --- CATEGORÍA 1: CONSULTAS Y BÚSQUEDAS AVANZADAS ---

  /**
   * Lista libros filtrando por género y/o año de publicación.
   */
  findBooksByGenreAndYear(filterDto: FilterBooksDto): Promise<Book[]> {
    const { genre, publicationYear } = filterDto;
    // `find` de TypeORM acepta un objeto `where` que construye la consulta dinámicamente.
    // Si una propiedad en `where` es `undefined`, TypeORM simplemente la ignora.
    return this.bookRepository.find({
      where: {
        genre: genre,
        publicationYear: publicationYear,
      },
      relations: ['authors'], // Incluimos los autores en el resultado.
    });
  }

  /**
   * Busca carros fabricados en un rango de años.
   */
  findCarsByYearRange(rangeDto: CarYearRangeDto): Promise<Car[]> {
    const { startYear, endYear } = rangeDto;
    // `Between` es un operador especial de TypeORM para consultas de rango (ej: WHERE year BETWEEN 1990 AND 2000).
    return this.carRepository.find({
      where: {
        year: Between(startYear, endYear),
      },
    });
  }

  /**
   * Devuelve un conteo de cuántos carros tiene cada marca.
   */
  async getCarCountByBrand(): Promise<any> {
    // Usamos el QueryBuilder para crear consultas más complejas con agregaciones (COUNT, GROUP BY).
    return this.brandRepository.createQueryBuilder('brand')
      .leftJoinAndSelect('brand.cars', 'car') // Une la tabla de marcas con la de carros.
      .select('brand.name', 'brandName') // Selecciona el nombre de la marca.
      .addSelect('COUNT(car.id)', 'carCount') // Cuenta los carros.
      .groupBy('brand.name') // Agrupa los resultados por nombre de marca.
      .orderBy('carCount', 'DESC') // Ordena de la marca con más carros a la que tiene menos.
      .getRawMany(); // `getRawMany` devuelve los resultados crudos de la consulta.
  }

  // --- CATEGORÍA 2: LÓGICA DE NEGOCIO COMPLEJA ---

  /**
   * Desactiva un usuario en lugar de eliminarlo (Soft Delete).
   */
  async softDeleteUser(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    
    user.isActive = false; // Simplemente cambiamos su estado.
    return this.userRepository.save(user);
    // NOTA: TypeORM también tiene soporte nativo para Soft Delete con @DeleteDateColumn.
  }
  
  /**
   * "Vende" un carro, descontando su stock.
   */
  async sellCar(carId: string, quantity: number = 1): Promise<Car> {
      const car = await this.carRepository.findOneBy({ id: carId });
      if (!car) throw new NotFoundException('Car not found');

      if (car.stock < quantity) {
          throw new BadRequestException(`Not enough stock. Available: ${car.stock}`);
      }

      car.stock -= quantity;
      return this.carRepository.save(car);
  }

  // --- CATEGORÍA 3: RELACIONES ENTRE ENTIDADES ---

  /**
   * Asigna un autor existente a un libro existente.
   */
  async assignAuthorToBook(bookId: string, assignAuthorDto: AssignAuthorDto): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id: bookId },
      relations: ['authors'],
    });
    if (!book) throw new NotFoundException('Book not found');

    const author = await this.authorRepository.findOneBy({ id: assignAuthorDto.authorId });
    if (!author) throw new NotFoundException('Author not found');

    // Añadimos el autor al arreglo de autores del libro y guardamos.
    book.authors.push(author);
    return this.bookRepository.save(book);
  }

  /**
   * Lista todos los libros de un autor específico.
   */
  findBooksByAuthor(authorId: string): Promise<Book[]> {
    return this.bookRepository.find({
        where: {
            authors: {
                id: authorId
            }
        },
        relations: ['authors']
    });
  }

  // --- CATEGORÍA 4: AUTORIZACIÓN AVANZADA ---

  /**
   * Permite que un usuario actualice solo un carro que le pertenece.
   */
  async updateCarOwnedByUser(carId: string, userId: string, updateDto: any): Promise<Car> {
      // Primero, buscamos el carro asegurándonos de que pertenezca al usuario.
      const car = await this.carRepository.findOne({ where: { id: carId, owner: { id: userId } } });
      
      if (!car) {
          throw new NotFoundException(`Car with ID "${carId}" not found or not owned by user.`);
      }

      // Fusionamos los nuevos datos y guardamos.
      Object.assign(car, updateDto);
      return this.carRepository.save(car);
  }

  // --- CATEGORÍA 5: FUNCIONALIDADES ADICIONALES ---

  /**
   * Añade nuevas características a un carro.
   */
  async addFeaturesToCar(carId: string, addFeaturesDto: AddFeaturesDto): Promise<Car> {
      const car = await this.carRepository.findOneBy({ id: carId });
      if (!car) throw new NotFoundException('Car not found');

      // Usamos un Set para evitar duplicados y luego lo convertimos de nuevo a arreglo.
      const updatedFeatures = new Set([...car.features, ...addFeaturesDto.features]);
      car.features = Array.from(updatedFeatures);

      return this.carRepository.save(car);
  }

  /**
   * Llena la base de datos con datos de prueba (Seeder).
   */
  async seedDatabase() {
      // Limpiamos las tablas en el orden correcto para evitar problemas de claves foráneas.
      await this.carRepository.delete({});
      await this.brandRepository.delete({});

      const brandsData = [
          { name: 'Toyota', slug: 'toyota' },
          { name: 'Honda', slug: 'honda' },
          { name: 'Ford', slug: 'ford' },
      ];
      
      const brands = await this.brandRepository.save(brandsData);
      
      const carsData = [
          { model: 'Corolla', year: 2021, brand: brands[0], stock: 10, price: 25000 },
          { model: 'Civic', year: 2022, brand: brands[1], stock: 5, price: 27000 },
          { model: 'Mustang', year: 2023, brand: brands[2], stock: 3, price: 55000 },
      ];

      await this.carRepository.save(carsData);

      return { message: 'Database seeded successfully!' };
  }
}