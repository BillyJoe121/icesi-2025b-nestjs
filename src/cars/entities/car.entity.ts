import { Brand } from "src/brands/entities/brand.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Car {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(()=> Brand, (brand)=> brand.cars)
    brand: string;

    @Column('text', {unique:true})
    model: string;

    @Column('int')
    year: number;
}