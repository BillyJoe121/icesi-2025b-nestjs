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
  constructor(
    @InjectRepository(Brand) private readonly brandRepository: Repository<Brand>
  ){}

  create(createBrandDto: CreateBrandDto) {
    try {
      const brand = this.brandRepository.create(createBrandDto);
      return this.brandRepository.save(brand);
    } catch (error) {
      throw new InternalServerErrorException('Error creating brand');
    }
  }

  findAll(pagination: PaginationDto) {
    const { limit, offset} = pagination; 
    return this.brandRepository.find({
      take: limit, 
      skip: offset
    });
  }

  async findOne(term: string) {

    let brand: Brand | null = null; 

    if(isUUID(term)){
     const brand: Brand| null = await this.brandRepository.findOneBy({id: term});

    }else{
      const queryBuilder = this.brandRepository.createQueryBuilder('brand');
      brand = await queryBuilder.where('UPPER(name)=:brand or slug=:slug', {brand: term.toUpperCase(), slug: term.toLowerCase()}).getOne();
    }

    if(!brand)
    throw new NotFoundException(`Brand not found`);
  
    return brand; 
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    const brand: Brand | undefined = await this.brandRepository.preload({
      id, 
      ...updateBrandDto
    }); 

    if (!brand)
      throw new NotFoundException(`Brand with id ${id} not found`);


    return this.brandRepository.save(brand);
    
  }

  async remove(id: string) {
    const brand = await this.findOne(id); 

    return await this.brandRepository.remove(brand); 
  }
}
