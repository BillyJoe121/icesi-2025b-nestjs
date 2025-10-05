// ========================================================================================
// ARCHIVO: servicios-extras-entidades-dtos.ts
// PROPÓSITO: Centralizar todas las nuevas Entidades y DTOs necesarios para las
//            funcionalidades avanzadas. Esto mantiene el código organizado.
// CÓMO USARLO: Deberías separar cada entidad y DTO en su propio archivo dentro de su
//              módulo correspondiente (ej: Author en 'src/authors/entities/author.entity.ts').
//              Aquí están juntos para facilitar tu estudio.
// ========================================================================================

import { Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional, IsPositive, IsString, IsUUID, Max, Min, MinLength } from 'class-validator';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

// --------------------------------------------------------------------------------------
// 1. ENTIDADES PARA RELACIONES AVANZADAS
// --------------------------------------------------------------------------------------

// --- Entidad para relación Uno a Uno (User -> UserProfile) ---
@Entity()
export class UserProfile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { nullable: true })
    bio?: string;

    @Column('text', { nullable: true })
    avatarUrl?: string;

    // @OneToOne: Define la relación. Un perfil pertenece a UN solo usuario.
    // `(user) => user.profile`: Especifica la propiedad inversa en la entidad User.
    @OneToOne(() => User, (user) => user.profile)
    @JoinColumn() // ¡Importante! En una relación 1-a-1, el lado que tiene @JoinColumn contendrá la clave foránea.
    user: User;
}

// --- Entidad para relación Muchos a Muchos (Book <-> Author) ---
@Entity()
export class Author {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @ManyToMany(() => Book, (book) => book.authors)
    books: Book[];
}

@Entity()
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    title: string;

    @Column('text')
    genre: string;

    @Column('int')
    publicationYear: number;

    @ManyToMany(() => Author, (author) => author.books, { cascade: true, eager: true })
    @JoinTable() // Este lado es el "dueño" de la relación y creará la tabla intermedia.
    authors: Author[];
}

// --------------------------------------------------------------------------------------
// 2. MODIFICACIONES A ENTIDADES EXISTENTES (Ejemplos)
// --------------------------------------------------------------------------------------

// --- Modificación a la entidad User para incluir la relación 1-a-1 y la fecha de último login ---
class User {
    // ... (propiedades existentes como id, email, password, etc.)

    // Relación inversa para el perfil de usuario.
    @OneToOne(() => UserProfile, (profile) => profile.user)
    profile: UserProfile;

    @UpdateDateColumn({ name: 'last_login', nullable: true })
    lastLogin?: Date;

    // Relación para saber qué carros "pertenecen" a un usuario.
    @OneToMany(() => Car, (car) => car.owner)
    cars: Car[];
}

// --- Modificación a la entidad Car para añadir stock y propietario ---
class Car {
    // ... (propiedades existentes como id, model, year, brand)

    @Column('int', { default: 0 })
    stock: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    price: number;

    // Relación para saber a qué usuario pertenece el carro.
    @ManyToOne(() => User, (user) => user.cars, { nullable: true }) // Un carro puede no tener dueño.
    owner?: User;

    @Column('text', { array: true, default: [] })
    features: string[];
}


// --------------------------------------------------------------------------------------
// 3. DTOS PARA CONSULTAS Y LÓGICA DE NEGOCIO AVANZADA
// --------------------------------------------------------------------------------------

// --- DTO para filtrar libros ---
export class FilterBooksDto {
    @IsOptional()
    @IsString()
    genre?: string;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    publicationYear?: number;
}

// --- DTO para buscar carros en un rango de años ---
export class CarYearRangeDto {
    @IsInt()
    @Min(1900)
    @Type(() => Number)
    startYear: number;

    @IsInt()
    @Max(new Date().getFullYear() + 1)
    @Type(() => Number)
    endYear: number;
}

// --- DTO para asignar un autor a un libro ---
export class AssignAuthorDto {
    @IsUUID()
    authorId: string;
}

// --- DTO para añadir características a un carro ---
export class AddFeaturesDto {
    @IsArray()
    @IsString({ each: true })
    features: string[];
}