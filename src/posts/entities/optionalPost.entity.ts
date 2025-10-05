// ========================================================================================
// ARCHIVO: src/posts/entities/optionalPost.entity.ts
// PROPÓSITO: Definir la entidad para las Publicaciones ('Posts') y ser el lado "dueño"
//            de la relación Muchos a Muchos.
// ========================================================================================

import { Tag } from "src/tags/entities/optionalTag.entity.ts";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post { // Podrías llamarlo 'OptionalPost'.
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    title: string;

    @Column('text', { nullable: true })
    content?: string;

    // ----------------------------------------------------------------------------------------
    // ¡RELACIÓN MUCHOS A MUCHOS (LADO "DUEÑO")!
    // ----------------------------------------------------------------------------------------
    // @ManyToMany: Indica que una Publicación puede tener muchas Etiquetas.
    // - `() => Tag`: La entidad con la que se relaciona.
    // - `(tag) => tag.posts`: La relación inversa.
    // - `{ cascade: true }`: ¡Opción muy útil! Significa que si creas un Post nuevo y le
    //   asocias Tags nuevos, TypeORM guardará el Post Y los Tags en una sola operación .save().
    @ManyToMany(() => Tag, (tag) => tag.posts, { cascade: true, eager: true })

    // ¡EL DECORADOR CLAVE!
    // @JoinTable(): Este decorador es el más importante. SOLO se pone en un lado.
    // Le ordena a TypeORM crear una tabla intermedia (tabla pivote) para gestionar esta relación.
    // Por defecto, la tabla se llamará `post_tags_tag`.
    // Esta tabla tendrá dos columnas: `postId` y `tagId`, que serán las claves foráneas.
    @JoinTable()
    tags: Tag[];
}