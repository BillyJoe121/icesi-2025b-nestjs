// EXPLICACIÓN:
// Este archivo define la entidad 'Brand', que representa la tabla de marcas en la base de datos.

import { Car } from "src/cars/entities/car.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// @Entity() marca esta clase como una tabla en la base de datos. Por defecto, se llamará 'brand'.
@Entity()
export class Brand {
    // @PrimaryGeneratedColumn('uuid') define el 'id' como la llave primaria con un valor autogenerado de tipo UUID.
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // @Column('text', {unique: true}) define una columna de texto que debe ser única.
    // No se pueden repetir nombres de marcas.
    @Column('text', { unique: true })
    name: string;

    // Columna para el 'slug', una versión del nombre amigable para URLs (ej. 'toyota', 'mercedes-benz').
    // También debe ser único.
    @Column('text', { unique: true })
    slug: string;

    // ¡ESTO DEFINE LA RELACIÓN!
    // @OneToMany especifica una relación de "uno a muchos".
    // Una marca (Brand) puede tener muchos carros (Car).
    // El primer argumento `() => Car` le dice a TypeORM con qué entidad se relaciona.
    // El segundo argumento `(car) => car.brand` es crucial: le dice a TypeORM
    // cómo encontrar la relación inversa. "En la entidad Car, la propiedad que me relaciona es 'brand'".
    @OneToMany(() => Car, (car) => car.brand)
    cars: Car[]; // Esta propiedad existirá en las instancias de Brand, pero no como una columna en la tabla.

    // ¡UN HOOK DE TYPEORM!
    // @BeforeInsert() es un "hook" o "disparador" que TypeORM ejecuta automáticamente
    // justo ANTES de insertar un nuevo registro en la base de datos.
    @BeforeInsert()
    checkSlug(): void {
        // Si no se proporcionó un slug al crear la marca...
        if (!this.slug) {
            // ...lo generamos a partir del nombre.
            this.slug = this.name;
        }

        // Limpiamos y estandarizamos el slug: lo convertimos a minúsculas,
        // reemplazamos espacios por guiones bajos y quitamos apóstrofes.
        // Ejemplo: "O'Reilly Auto Parts" -> "oreilly_auto_parts"
        this.slug = this.slug.toLowerCase().replaceAll(' ', '_').replaceAll('\'', '');
    }
}