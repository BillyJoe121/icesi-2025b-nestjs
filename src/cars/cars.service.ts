import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {v4 as uuid} from 'uuid';

import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './entities/car.entity';
import { UpdateCarDto } from './dto/update-car.dto';
import { BrandsService } from 'src/brands/brands.service';

@Injectable()
export class CarsService {
  
  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>, 
    private readonly brandService: BrandsService,
  ){}


  getAll() :  Promise<Car[]> {
    return this.carRepository.find();
  }

  async getById(id: string): Promise<Car> {
    let car = await this.carRepository.findOneBy({id});

    if(car=== null)
      throw new NotFoundException(`car with id: ${id} not found`);

    return car;
  }

  async  create(car: CreateCarDto): Promise<Car> {

    const brand = await this.brandService.findOne(car.brand);
    if(brand == null) throw new NotFoundException(`brand with id: ${car.brand} not found`);

    const carObj = Object.assign(car, {brand}); 

    const carNew: Car = this.carRepository.create(carObj)
    
    return this.carRepository.save(carNew);
  }

  async  update(id: string, car: UpdateCarDto): Promise<Car> {
    let result = await this.carRepository.update(id, car);
    if (result.affected && result.affected < 1)
      throw new NotFoundException(`car with id: ${id} not found`);

    return this.getById(id );
  }
  
  async delete(id: string): Promise<Car> {
    let car = await this.getById(id);

    this.carRepository.delete(id);

    return car;
  }
}