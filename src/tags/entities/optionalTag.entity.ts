// ========================================================================================
// ARCHIVO: src/tags/entities/optionalTag.entity.ts
// PROPÓSITO: Definir la entidad para las Etiquetas ('Tags').
// ========================================================================================

import { Post } from "src/posts/entities/optionalPost.entity"; // Importamos la futura entidad Post.
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tag { // Le podrías llamar 'OptionalTag' si prefieres, pero 'Tag' es más estándar.
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true })
    name: string;
    
    // ----------------------------------------------------------------------------------------
    // ¡RELACIÓN MUCHOS A MUCHOS (LADO INVERSO)!
    // ----------------------------------------------------------------------------------------
    // @ManyToMany: Indica que una Etiqueta puede estar asociada con muchas Publicaciones.
    // - PRIMER ARGUMENTO: `() => Post`: La entidad con la que se relaciona.
    // - SEGUNDO ARGUMENTO: `(post) => post.tags`: La "relación inversa". Le dice a TypeORM:
    //   "En la entidad Post, la propiedad que me conecta de vuelta es 'tags'".
    @ManyToMany(() => Post, (post) => post.tags)
    posts: Post[];
    
    // NOTA IMPORTANTE: Fíjate que aquí NO hay un decorador `@JoinTable`.
    // En una relación M-a-M, `@JoinTable` se coloca en UNO SOLO de los dos lados.
    // El lado que tiene `@JoinTable` se considera el "dueño" de la relación y es
    // el responsable de la tabla intermedia que se creará en la base de datos.
}