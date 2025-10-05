// ========================================================================================
// ARCHIVO: src/cars/entities/car.entity.ts
// PROPÓSITO: Definir la ESTRUCTURA y RELACIONES de la tabla 'cars' en la base de datos.
// TypeORM leerá esta clase para crear y gestionar la tabla automáticamente.
// ========================================================================================

// Importamos la entidad 'Brand' porque vamos a establecer una relación directa con ella.
import { Brand } from "src/brands/entities/brand.entity";
// Importamos los decoradores de TypeORM que nos permiten definir la estructura de la tabla.
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// @Entity() convierte la clase 'Car' en una entidad de TypeORM.
// Por defecto, creará una tabla llamada 'car' (en minúsculas).
@Entity()
export class Car {
    // @PrimaryGeneratedColumn('uuid')
    // - @PrimaryGeneratedColumn: Marca esta propiedad como la columna de clave primaria.
    // - 'uuid': Especifica que el valor se autogenerará como un Identificador Único Universal.
    //   (ej: "123e4567-e89b-12d3-a456-426614174000"). Es una práctica recomendada sobre los números
    //   secuenciales para mejorar la seguridad y evitar colisiones en sistemas distribuidos.
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // ----------------------------------------------------------------------------------------
    // ¡ESTA ES LA RELACIÓN CLAVE! LADO "MUCHOS" (Many)
    // ----------------------------------------------------------------------------------------
    // @ManyToOne: Define una relación de "muchos a uno". Muchos carros (Car) pertenecen a UNA marca (Brand).
    // - PRIMER ARGUMENTO: `() => Brand`: Indica que esta entidad ('Car') se relaciona con la entidad 'Brand'.
    // - SEGUNDO ARGUMENTO: `(brand) => brand.cars`: Es la "relación inversa". Le dice a TypeORM: "Para encontrar
    //   los carros asociados a una marca, busca la propiedad 'cars' dentro de la entidad 'Brand'".
    //   Esto conecta el `@ManyToOne` de aquí con el `@OneToMany` en `brand.entity.ts`.
    //
    // ⚠️ ERROR COMÚN CORREGIDO: El tipo original era 'string'. El tipo DEBE ser la entidad 'Brand'.
    // Aunque en la base de datos se crea una columna `brandId` para la clave foránea, en nuestro
    // código TypeScript, esta propiedad contendrá el OBJETO COMPLETO de la marca, no solo su ID.
    // Esto permite hacer `miCarro.brand.name` de forma intuitiva.
    @ManyToOne(() => Brand, (brand) => brand.cars)
    brand: Brand; // Tipo corregido a 'Brand'

    // @Column('text', {unique:true})
    // - 'text': Define el tipo de dato en la base de datos como texto.
    // - {unique: true}: Impone una restricción a nivel de base de datos para que no puedan existir
    //   dos carros con el mismo modelo. Intentar insertar un duplicado resultará en un error.
    @Column('text', { unique: true })
    model: string;

    // @Column('int') define una columna de tipo número entero.
    @Column('int')
    year: number;
}