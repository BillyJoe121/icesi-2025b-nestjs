// ========================================================================================
// ARCHIVO: src/posts/posts.service.ts (Método 'create')
// PROPÓSITO: Orquestar la creación de una Publicación y sus relaciones con las Etiquetas.
// ========================================================================================

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { Tag } from '../tags/entities/tag.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,

        // Necesitamos el repositorio de Tag para poder buscar y crear etiquetas.
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
    ) { }

    async create(createPostDto: CreatePostDto): Promise<Post> {
        // Extraemos los nombres de las etiquetas del DTO.
        const { tags, ...postDetails } = createPostDto;

        // 1. MANEJAR LAS ETIQUETAS:
        // Mapeamos el arreglo de nombres de etiquetas a un arreglo de promesas.
        // Para cada nombre, llamamos a un método que la busca o la crea.
        const tagEntities = await Promise.all(
            tags.map(tagName => this.preloadTagByName(tagName))
        );

        // 2. CREAR LA PUBLICACIÓN:
        // Creamos una instancia de Post con sus detalles.
        const post = this.postRepository.create({
            ...postDetails,
            tags: tagEntities, // Le asignamos el ARREGLO DE ENTIDADES Tag que procesamos.
        });

        // 3. GUARDAR:
        // Gracias a la opción `{ cascade: true }` en la entidad Post,
        // al guardar el 'post', TypeORM también se encargará de insertar las
        // nuevas etiquetas que hayamos creado y de llenar la tabla intermedia `post_tags_tag`.
        return this.postRepository.save(post);
    }

    // --- Método Auxiliar Privado ---
    private async preloadTagByName(name: string): Promise<Tag> {
        // Buscamos si la etiqueta ya existe en la base de datos.
        const existingTag = await this.tagRepository.findOne({ where: { name } });

        // Si ya existe, la devolvemos.
        if (existingTag) {
            return existingTag;
        }

        // Si no existe, creamos una nueva instancia y la devolvemos.
        // (No la guardamos todavía, `cascade` se encargará de eso).
        return this.tagRepository.create({ name });
    }

    // ... otros métodos como findOne, findAll, update, delete ...

    // Ejemplo de cómo se vería un `findOne`:
    async findOne(id: string): Promise<Post> {
        // Para que TypeORM traiga las etiquetas junto con la publicación,
        // usamos la opción 'relations'.
        const post = await this.postRepository.findOne({
            where: { id },
            //relations: ['tags'] // Si no usas 'eager: true' en la entidad, debes especificarlo aquí.
        });
        if (!post) throw new NotFoundException(`Post with id ${id} not found`);
        return post;
    }
}