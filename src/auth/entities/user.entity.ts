// EXPLICACIÓN:
// Este archivo define la ESTRUCTURA de la tabla 'user' en la base de datos usando TypeORM.

// Importamos los decoradores necesarios de 'typeorm'.
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// @Entity() le dice a TypeORM que esta clase es una "entidad", lo que significa
// que debe crear una tabla en la base de datos llamada 'user' (el nombre de la clase en minúsculas).
@Entity()
export class User {

    // @PrimaryGeneratedColumn('uuid') define la columna 'id' como la llave primaria.
    // 'uuid' significa que generará un identificador único universal (ej: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6").
    // Es mejor que usar números autoincrementales para evitar que se puedan adivinar IDs.
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // @Column('text') define una columna simple de tipo 'text'.
    @Column('text')
    firstname: string;

    // La opción {unique: true} asegura que no puede haber dos usuarios con el mismo email.
    // La base de datos arrojará un error si intentas insertar un email duplicado.
    @Column('text', { unique: true })
    email: string;

    // ¡MUY IMPORTANTE PARA SEGURIDAD!
    // {select: false} le dice a TypeORM que, por defecto, NUNCA incluya esta columna
    // cuando hagas una consulta (como un 'find' o 'findOne').
    // Esto evita que accidentalmente envíes el hash de la contraseña al cliente.
    // Para obtenerla, debes pedirla explícitamente en la consulta.
    @Column('text', { select: false })
    password: string;

    // {array: true, default: []} define que esta columna guardará un arreglo de strings.
    // El 'default' establece que si no se provee un valor, será un arreglo vacío [].
    // En PostgreSQL, esto se guarda en un tipo de dato 'array'.
    // Aquí guardaremos los roles del usuario, ej: ['admin', 'user'].
    // ERROR COMÚN: En la entidad el tipo es 'string', pero la opción 'array: true' hace que TypeORM
    // lo maneje como un arreglo. Al usarlo en tu código, el tipo de 'user.roles' será string[].
    @Column('text', { array: true, default: [] })
    roles: string[]; // Se corrige el tipo a string[] para que coincida con el uso real.

    // @Column('bool', {default: true}) define una columna booleana (true/false)
    // que por defecto tendrá el valor 'true'.
    @Column('bool', { default: true })
    isActive: boolean;
}