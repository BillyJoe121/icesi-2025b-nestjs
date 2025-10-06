import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Publisher {

    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column('text', { unique: true })
    name: string;


    @Column('text', { unique: false })
    headquarters: string;

    @Column('int')
    foundationYear: number;
}