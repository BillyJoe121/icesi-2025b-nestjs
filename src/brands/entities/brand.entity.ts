import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Brand {
    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @Column('text', {unique: true})
    name: string;

    @Column('text')
    slug: string; 


}
