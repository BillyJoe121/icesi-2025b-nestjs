Cómo Evitar el Reemplazo Indiscriminado
Cuando usas el método de Buscar y Reemplazar (Ctrl + H en Windows/Linux o Cmd + Option + F en Mac), tienes unas pequeñas opciones para controlar exactamente cómo se hace la búsqueda.

Abre el menú de Buscar y Reemplazar con Ctrl + H.

Ingresa el texto a buscar (ej: car) y el texto de reemplazo (ej: book).

Ahora, fíjate en los iconos que están a la derecha del campo de búsqueda:

Aa (Match Case): Este es el que necesitas. Haz clic en este icono para activarlo. Cuando está azul (activado), la búsqueda distinguirá entre mayúsculas y minúsculas. Solo encontrará car, ignorando por completo Car.

[ab] (Match Whole Word): También muy recomendado. Activa este icono para que solo encuentre la palabra completa. Así, si buscas car, no intentará reemplazar la palabra carton o carry.

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
