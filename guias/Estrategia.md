# REEMPLAZAR 

Pasos para el Reemplazo Seguro:

Presiona Ctrl + H.

Escribe la palabra en minúsculas que quieres cambiar (ej: car).

Escribe el reemplazo en minúsculas (ej: book).

Activa el icono Aa (Match Case).

Activa el icono [ab] (Match Whole Word).

Haz clic en "Replace All".

Repite el proceso para la versión con mayúscula:

Buscar: Car

Reemplazar: Book

Asegúrate de que Aa y [ab] sigan activados.

Haz clic en "Replace All".

Recordatorio del Método Más Seguro
Recuerda que el primer método que te mencioné, "Cambiar todas las ocurrencias" (Ctrl + F2 o Cmd + F2), generalmente evita este problema. Como es contextual, si haces clic en la variable car, solo seleccionará las otras variables car, y si haces clic en la clase Car, solo seleccionará las otras clases Car.


# ORDEN A SEGUIR 

### **Posible Enunciado del Parcial de NestJS**

Basado en el parcial anterior y en la estructura de NestJS, el enunciado probablemente se verá así:

> **Parcial Individual: NestJS**
>
> **Descripción:**
> El proyecto base del curso contiene algunos errores (tanto de lógica como de configuración) que deberás identificar y corregir para que la aplicación funcione.
>
> Una vez corregido, deberás implementar un nuevo módulo para gestionar **Libros** (`books`) y **Autores** (`authors`), incluyendo una relación **Muchos a Muchos** entre ellos.
>
> **Objetivos:**
>
> 1.  **Corrección de Errores:** Identificar y solucionar los errores en el proyecto para que levante y los endpoints existentes funcionen.
> 2.  **Implementar Módulo `Authors`:**
>       * Crear una entidad `Author` con `id` y `name`.
>       * Implementar un CRUD completo para `Authors` (Crear, Listar, Buscar por ID, Actualizar, Eliminar).
>       * Asegurar que los DTOs tengan las validaciones adecuadas (`@IsString`, `@MinLength`, etc.).
> 3.  **Implementar Módulo `Books`:**
>       * Crear la entidad `Book` con `id`, `title` y su relación con `Author`.
>       * Implementar un CRUD completo para `Books`. Al crear un libro, se debe poder asociar uno o más autores por su ID.
> 4.  **Funcionalidad Específica:**
>       * Crear un endpoint `GET /authors/:id/books` que liste todos los libros de un autor específico.
>
> **Entregables:**
> Código funcionando en un repositorio, con los errores corregidos y las nuevas funcionalidades implementadas.

-----

### **Plan de Acción en 5 Pasos**


#### **Paso 1: ¡Que la Aplicación Arranque\! (Los Primeros 15 Minutos)**

Tu primer objetivo no es resolver el parcial, es hacer que el comando `yarn start:dev` funcione sin errores. Los errores de arranque son los más comunes y suelen estar en los archivos de configuración.

  * **Orden de Archivos a Revisar:**
    1.  **`app.module.ts`**: ¿Están todos los módulos (`AuthModule`, `CarsModule`, etc.) correctamente importados? ¿La configuración de `TypeOrmModule.forRoot({...})` parece correcta (tiene todas las entidades listadas)?
    2.  **`main.ts`**: ¿La configuración del `ValidationPipe` es correcta? ¿Está importando `AppModule`?
    3.  **`tsconfig.json`**: Revisa las dos líneas críticas para NestJS: `"emitDecoratorMetadata": true` y `"experimentalDecorators": true`. Si están en `false`, la inyección de dependencias fallará.
    4.  **`docker-compose.yaml`**: Asegúrate de que los puertos y las variables de entorno de la base de datos coinciden con tu archivo `.env`.

#### **Paso 2: La Plantilla Maestra (Copia el Módulo `brands`)**

No programes desde cero. El módulo `brands` es tu plantilla perfecta para un CRUD.

  * **Acción Inmediata:**

    1.  Ejecuta `nest g module authors` y `nest g controller authors` y `nest g service authors`.
    2.  Abre **en paralelo** los archivos del módulo `brands` y los nuevos archivos de `authors`.
    3.  **Copia, pega y renombra.** Usa `Ctrl+F2` (o `Cmd+F2`) para cambiar todas las ocurrencias de `Brand` a `Author` y `brand` a `author`.

  * **Orden de Archivos a Mirar y Modificar:**

    1.  Usa **`brand.entity.ts`** como guía para crear **`author.entity.ts`**.
    2.  Usa **`create-brand.dto.ts`** como guía para crear **`create-author.dto.ts`**.
    3.  Usa **`brands.service.ts`** como guía para crear **`authors.service.ts`**.
    4.  Usa **`brands.controller.ts`** como guía para crear **`authors.controller.ts`**.
    5.  Usa **`brands.module.ts`** como guía para crear **`authors.module.ts`**.
    6.  **¡No olvides\!** Importa tu nuevo `AuthorsModule` en **`app.module.ts`**.

Al final de este paso, ya deberías tener un CRUD completo y funcional para Autores. Ya tienes una gran parte de los puntos.

#### **Paso 3: Implementar la Relación Muchos a Muchos**

Ahora crea el módulo `books` y establece la relación. Aquí es donde usas tu "as bajo la manga".

  * **Orden de Archivos a Mirar y Modificar:**
    1.  Usa tu archivo de apuntes **`servicios-extras-entidades-dtos.ts`** que preparamos.
    2.  Crea **`book.entity.ts`** y **`author.entity.ts`** (modificándolo) para que tengan la relación `@ManyToMany` y `@JoinTable` tal como lo practicamos.
    3.  Crea el **`create-book.dto.ts`** esperando un arreglo de IDs de autores (`authors: string[]`).
    4.  En **`books.service.ts`**, implementa la lógica del método `create`. Aquí, tu referencia principal es el método `create` de **`servicios-extras.service.ts`**, que te muestra cómo procesar el arreglo de IDs para convertirlos en entidades.
    5.  Añade el `BooksModule` a `app.module.ts`.

#### **Paso 4: La Consulta Específica (El Desafío Final)**

Aquí es donde demuestras que puedes ir más allá del CRUD básico. Necesitas crear el endpoint `GET /authors/:id/books`.

  * **Orden de Archivos a Mirar y Modificar:**
    1.  Tu referencia es el método **`findBooksByAuthor`** en tu archivo de apuntes **`servicios-extras.service.ts`**.
    2.  **En `authors.service.ts`**, crea un nuevo método `findBooksByAuthor(authorId: string)`. La lógica será casi idéntica a la del archivo de apuntes (usando el `bookRepository`). Para que esto funcione, tendrás que inyectar `@InjectRepository(Book)` en el constructor de `AuthorsService`.
    3.  **En `authors.controller.ts`**, crea una nueva ruta:
        ```typescript
        @Get(':id/books')
        findBooksByAuthor(@Param('id', ParseUUIDPipe) id: string) {
          return this.authorsService.findBooksByAuthor(id);
        }
        ```
    4.  **Importante:** Para que `AuthorsService` pueda usar `BookRepository`, debes importar `TypeOrmModule.forFeature([Book])` en el `imports` de **`authors.module.ts`**.


