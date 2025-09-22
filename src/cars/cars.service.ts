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

@Injectable()
export class CarsService {
  
  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>
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

    let carNew = await this.carRepository.save(car);

    return carNew;
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