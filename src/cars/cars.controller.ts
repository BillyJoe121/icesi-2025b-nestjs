import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
export class CarsController {

    constructor(
        private readonly carService: CarsService
    ){}

    @Get('')
    getAll() {
        return this.carService.getAll();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number){
        return this.carService.getById(id);
    }

    @Post('')
    create(@Body() car:CreateCarDto){
        return this.carService.create(car);
    }
}
