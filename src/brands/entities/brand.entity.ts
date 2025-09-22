import { Car } from "src/cars/entities/car.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Brand {
    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @Column('text', {unique: true})
    name: string;

    @Column('text', {unique: true})
    slug: string;

    @OneToMany(() => Car, (car) =>car.brand )
    cars: Car[];

    @BeforeInsert()
    checkSlug(): void {
        if(!this.slug){
            this.slug = this.name
        }
        this.slug = this.slug.toLowerCase().replaceAll(' ','_',).replaceAll('\'', '');
    }
}
