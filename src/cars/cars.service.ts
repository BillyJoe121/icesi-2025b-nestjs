import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarsService {

    private cars = [
        {
            brand: "Chevrolet", 
            model: "Spark", 
            year: 2020
        }, 
        {
            brand: "BYD", 
            model: "Yuan UP", 
            year: 2020
        }
    ]

    getAll(){
        return this.cars;
    }

    getById(id: number){
        if(!this.cars[id]) 
            throw new NotFoundException(`car with id: ${id} not found` ); 
        return this.cars[id];
    }

    create(car: CreateCarDto){
        this.cars.push(car);
        return car; 
    }
}