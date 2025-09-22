import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Car {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    brand: string;

    @Column('text', {unique:true})
    model: string;

    @Column('int')
    year: number;
}