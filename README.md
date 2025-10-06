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





# Comandos para tu Proyecto NestJS**

#### **1. Instalación y Configuración Inicial**


| Comando | Descripción |
| :--- | :--- |
| `yarn install` | **(El más importante)** Lee el `package.json` e instala todas las dependencias (`dependencies` y `devDependencies`) en la carpeta `node_modules`. **Siempre es el primer comando que debes ejecutar en un proyecto nuevo.** |
| `npm install` | Alternativa a `yarn install` si prefieres usar `npm`. |

---
#### **2. Manejo de la Base de Datos (con Docker)**

Estos comandos gestionan los contenedores de tu base de datos PostgreSQL y PgAdmin.

| Comando | Descripción |
| :--- | :--- |
| `docker-compose up -d` | **(Esencial para empezar)** Lee el `docker-compose.yaml` y levanta todos los servicios (tu base de datos `db` y `pgadmin`) en segundo plano (`-d`). **Necesitas ejecutar esto antes de `yarn start:dev` para que la app pueda conectarse a la base de datos.** |
| `docker-compose down` | Detiene y elimina los contenedores creados por `docker-compose up`. Útil para "limpiar" tu entorno. Los datos persistirán si configuraste los volúmenes correctamente. |
| `docker-compose ps` | Muestra el estado actual de tus contenedores (si están corriendo, detenidos, etc.). Muy útil para verificar que la base de datos se levantó correctamente. |
| `docker logs <nombre_contenedor>` | Muestra los logs de un contenedor específico (ej: `docker logs car_dealership`). Esencial para depurar si la base de datos no arranca. |

---
#### **3. Ejecución de la Aplicación**

Estos comandos inician tu servidor de NestJS.

| Comando | Descripción |
| :--- | :--- |
| `yarn start:dev` | **(El que usarás el 99% del tiempo)** Inicia la aplicación en **modo desarrollo**. Usa `ts-node` para compilar y ejecutar en memoria, y lo más importante, activa el **modo "watch"** (recarga en caliente), que reinicia el servidor automáticamente cada vez que guardas un cambio en un archivo. |
| `yarn build` | Compila tu código TypeScript (`.ts`) a JavaScript (`.js`) y lo guarda en la carpeta `/dist`. Este paso es necesario antes de poder ejecutar la aplicación en modo producción. |
| `yarn start:prod` | **(Para producción)** Ejecuta la aplicación usando el código JavaScript ya compilado que está en la carpeta `/dist`. Es mucho más rápido y eficiente que el modo `dev`, pero no se recarga automáticamente. |

---
#### **4. Pruebas (Testing)**

Estos comandos son para verificar que tu código funciona como se espera. El profesor podría pedirte que las pruebas pasen antes de entregar.

| Comando | Descripción |
| :--- | :--- |
| `yarn test` | Ejecuta todas las **pruebas unitarias** del proyecto (los archivos que terminan en `.spec.ts`). Estas pruebas verifican pequeñas piezas de código (como un método de un servicio) de forma aislada. |
| `yarn test:watch` | Ejecuta las pruebas unitarias en modo interactivo. El terminal se queda esperando y vuelve a correr las pruebas automáticamente cada vez que guardas un cambio en un archivo. Muy útil cuando estás desarrollando una nueva función. |
| `yarn test:cov` | Ejecuta las pruebas unitarias y, al finalizar, genera un **reporte de cobertura** en la carpeta `/coverage`. Este reporte te dice qué porcentaje de tu código está siendo probado. |
| `yarn test:e2e` | Ejecuta las **pruebas End-to-End** (los archivos que terminan en `.e2e-spec.ts`). Estas pruebas levantan la aplicación completa y simulan peticiones HTTP reales para verificar el flujo completo, desde la ruta hasta la base de datos. |

---
#### **5. Calidad de Código y Generación**

| Comando | Descripción |
| :--- | :--- |
| `yarn lint` | Ejecuta **ESLint** para analizar tu código en busca de errores de sintaxis, problemas de estilo y posibles bugs según las reglas definidas en `eslint.config.mjs`. |
| `yarn format` | Ejecuta **Prettier** para formatear automáticamente todo tu código y asegurar que siga un estilo consistente (comillas, espacios, etc.). |
| `nest g module <nombre>` | **(Muy útil para el parcial)** Usa la CLI de Nest para **generar** un nuevo módulo completo (ej: `nest g module books`). |
| `nest g co <nombre>` | Genera un nuevo **controlador**. |
| `nest g s <nombre>` | Genera un nuevo **servicio**. |





























































# Título del Proyecto (Ej: API de Concesionario - NestJS)

> Una breve descripción de 1 o 2 líneas sobre lo que hace el proyecto. Por ejemplo: "Una API RESTful construida con NestJS, TypeORM y PostgreSQL para gestionar un concesionario de vehículos, incluyendo módulos para carros, marcas y autenticación de usuarios."

## Características Principales ✨

  * **CRUD Completo:** Endpoints para Crear, Leer, Actualizar y Eliminar para los módulos de `Cars` y `Brands`.
  * **Autenticación y Autorización:** Sistema de registro y login basado en JWT (JSON Web Tokens) con protección de rutas y roles.
  * **Validación de Datos:** Uso de DTOs y `class-validator` para asegurar que los datos de entrada sean correctos y seguros.
  * **Paginación:** Capacidad de paginar los resultados en los listados para un rendimiento eficiente.
  * **Base de Datos Relacional:** Uso de TypeORM para gestionar las relaciones entre carros y marcas.
  * **Entorno Dockerizado:** Configuración con Docker Compose para levantar la base de datos PostgreSQL y PgAdmin con un solo comando.

-----

## 1\. Prerrequisitos 📋

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

  * [Node.js](https://nodejs.org/) (se recomienda v18 o superior)
  * [Yarn](https://yarnpkg.com/) (o puedes adaptar los comandos a `npm` o `pnpm`)
  * [Docker](https://www.docker.com/products/docker-desktop/) y Docker Compose

-----

## 2\. Configuración del Entorno ⚙️

Este es el paso más importante y el que más a menudo se olvida en los README.

1.  **Clonar el repositorio:**

    ```bash
    git clone https://URL_DE_TU_REPOSITORIO.git
    cd nombre-del-directorio
    ```

2.  **Instalar dependencias:**

    ```bash
    yarn install
    ```

3.  **Configurar las Variables de Entorno:**
    Este proyecto utiliza un archivo `.env` para gestionar las variables de entorno. Crea una copia del archivo `.env.example` (¡deberías crear este archivo\!) y renómbrala a `.env`.

    ```bash
    cp .env.example .env
    ```

    Luego, llena el archivo `.env` con los valores correspondientes. Un `.env.example` se vería así:

    ```
    # Archivo .env.example

    # Configuración de la Aplicación
    PORT=3000

    # Configuración de la Base de Datos (coincide con docker-compose.yaml)
    DB_PORT=5432
    DB_HOST=localhost
    DB_NAME=car_dealership
    DB_USERNAME=postgres
    DB_PASSWORD=hola1234

    # Configuración de JWT
    JWT_SECRET=ESTE_ES_UN_SECRETO_MUY_SEGURO
    JWT_EXPIRES_IN=2h
    ```

    > **Tip:** Explica que estas variables son cruciales y deben coincidir con las de `docker-compose.yaml`.

-----

## 3\. Ejecución del Proyecto 🚀

1.  **Levantar la Base de Datos con Docker:**
    Este comando iniciará los contenedores de PostgreSQL y PgAdmin en segundo plano.

    ```bash
    docker-compose up -d
    ```

      * La base de datos estará disponible en `localhost:5432`.
      * Puedes acceder a PgAdmin en `http://localhost:8888`.

2.  **Iniciar la aplicación NestJS en modo de desarrollo:**
    Este comando inicia el servidor y lo reiniciará automáticamente cada vez que guardes un cambio en el código.

    ```bash
    yarn start:dev
    ```

¡Listo\! La aplicación estará corriendo en `http://localhost:3000`.

-----

## 4\. Documentación de la API (Endpoints) 📚

Esta sección es **oro puro** para quien use tu API. Documenta cada endpoint, qué datos espera y qué devuelve. Puedes usar una herramienta como Postman o Insomnia para probarlos.

### Módulo de Autenticación (`/auth`)

  * **`POST /auth/register`**: Registra un nuevo usuario.

      * **Body (raw, JSON):**
        ```json
        {
          "firstname": "Joseph",
          "email": "test@example.com",
          "password": "Password12345"
        }
        ```

  * **`POST /auth/login`**: Inicia sesión y devuelve un token JWT.

      * **Body (raw, JSON):**
        ```json
        {
          "email": "test@example.com",
          "password": "Password12345"
        }
        ```
      * **Respuesta Exitosa:**
        ```json
        {
          "user_id": "...",
          "email": "test@example.com",
          "token": "ey..."
        }
        ```

### Módulo de Marcas (`/brands`)

  * **`POST /brands`**: Crea una nueva marca.
  * **`GET /brands?limit=10&offset=0`**: Obtiene un listado paginado de marcas.
  * **`GET /brands/:term`**: Busca una marca por `id`, `name` o `slug`.
  * **`PATCH /brands/:id`**: Actualiza una marca.
  * **`DELETE /brands/:id`**: Elimina una marca.

### Módulo de Carros (`/cars`)

  * **`POST /cars`**: Crea un nuevo carro.
      * **Body (raw, JSON):**
        ```json
        {
          "brand": "toyota", // Puede ser el nombre, slug o ID de una marca existente
          "model": "Corolla",
          "year": 2020
        }
        ```
  * **`GET /cars`**: Obtiene un listado de todos los carros.
  * **`GET /cars/:id`**: Busca un carro por su `id`.
  * ... (y así con los demás endpoints)

> **Tip:** Para las rutas protegidas, indica que se debe enviar el `token` en el header `Authorization` como `Bearer <token>`.

-----

## 5\. Ejecución de Pruebas 🧪

Para asegurar la calidad del código, puedes ejecutar las pruebas unitarias y end-to-end.

  * **Ejecutar todas las pruebas unitarias:**

    ```bash
    yarn test
    ```

  * **Ejecutar pruebas y ver el reporte de cobertura:**

    ```bash
    yarn test:cov
    ```

  * **Ejecutar las pruebas End-to-End:**
    (Asegúrate de que la base de datos esté corriendo)

    ```bash
    yarn test:e2e
    ```





<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
