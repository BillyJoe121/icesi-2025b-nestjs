// ========================================================================================
// ARCHIVO: package.json
// PROPÓSITO: Es el archivo central de configuración para cualquier proyecto de Node.js.
//            Define metadatos, dependencias y scripts de ejecución.
// ========================================================================================
{
  "name": "nestapp", // El nombre de tu proyecto.
  "version": "0.0.1", // La versión actual.
  "description": "",
  "author": "",
  "private": true, // Indica que este paquete no se publicará en un registro de npm.
  "license": "UNLICENSED",
  // --- SCRIPTS: Atajos para ejecutar comandos en la terminal ---
  "scripts": {
    "build": "nest build", // Compila el proyecto TypeScript a JavaScript en la carpeta /dist.
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"", // Formatea el código usando Prettier.
    "start": "nest start", // Inicia la aplicación (compila si es necesario y ejecuta).
    "start:dev": "nest start --watch", // Inicia en modo de desarrollo, se reinicia automáticamente al detectar cambios.
    "start:debug": "nest start --debug --watch", // Inicia en modo debug para depurar el código.
    "start:prod": "node dist/main", // Ejecuta la aplicación compilada desde /dist. Este es el comando para producción.
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix", // Analiza y corrige errores de estilo con ESLint.
    "test": "jest", // Ejecuta las pruebas unitarias (archivos .spec.ts).
    "test:watch": "jest --watch", // Ejecuta las pruebas en modo interactivo, re-ejecutando al guardar cambios.
    "test:cov": "jest --coverage", // Ejecuta las pruebas y genera un reporte de cobertura de código.
    "test:debug": "node --inspect-brk ...", // Ejecuta las pruebas en modo debug.
    "test:e2e": "jest --config ./test/jest-e2e.json" // Ejecuta las pruebas End-to-End.
  },
  // --- DEPENDENCIAS DE PRODUCCIÓN: Paquetes necesarios para que la aplicación funcione ---
  "dependencies": {
    "@nestjs/common": "^11.0.1", // Núcleo de NestJS (decoradores, inyección de dependencias, etc.).
    "@nestjs/config": "^4.0.2", // Para manejar variables de entorno (.env).
    "@nestjs/core": "^11.0.1", // El motor principal de NestJS.
    "@nestjs/jwt": "^11.0.0", // Para generar y verificar JSON Web Tokens.
    "@nestjs/passport": "^11.0.5", // Integración con Passport.js para estrategias de autenticación.
    "@nestjs/platform-express": "^11.0.1", // Adaptador para usar Express.js como servidor HTTP.
    "@nestjs/typeorm": "^11.0.0", // Integración con TypeORM, el ORM de la base de datos.
    "bcrypt": "^6.0.0", // Para hashear contraseñas de forma segura.
    "class-transformer": "^0.5.1", // Herramienta para transformar objetos (ej. en el ValidationPipe).
    "class-validator": "^0.14.2", // Para usar decoradores de validación en los DTOs.
    "passport": "^0.7.0", // El framework de autenticación.
    "passport-jwt": "^4.0.1", // La estrategia específica de Passport para validar JWTs.
    "pg": "^8.16.3", // El "driver" o conector para la base de datos PostgreSQL.
    "reflect-metadata": "^0.2.2", // Polyfill necesario para que funcionen los decoradores.
    "rxjs": "^7.8.1", // Librería para programación reactiva, una dependencia interna de NestJS.
    "typeorm": "^0.3.26", // El Object-Relational Mapper (ORM) para interactuar con la BD.
    "uuid": "^13.0.0" // Para generar UUIDs.
  },
  // --- DEPENDENCIAS DE DESARROLLO: Paquetes necesarios solo para desarrollar, probar y construir ---
  "devDependencies": {
    "@nestjs/cli": "^11.0.0", // La Interfaz de Línea de Comandos de NestJS.
    "@nestjs/schematics": "^11.0.0", // Plantillas para generar código con la CLI.
    "@nestjs/testing": "^11.0.1", // Utilidades para pruebas en NestJS.
    "@types/...": "...", // Archivos de definición de tipos para varias librerías.
    "eslint": "^9.18.0", // El linter de código.
    "jest": "^30.0.0", // El framework para pruebas.
    "supertest": "^7.0.0", // Para simular peticiones HTTP en las pruebas E2E.
    "ts-jest": "^29.2.5", // Un preprocesador para que Jest entienda TypeScript.
    "ts-loader": "^9.5.2", // Loader para que Webpack compile TypeScript.
    "ts-node": "^10.9.2", // Para ejecutar archivos TypeScript directamente en Node.js.
    "tsconfig-paths": "^4.2.0", // Ayuda a resolver las rutas absolutas definidas en tsconfig.json.
    "typescript": "^5.7.3" // El lenguaje TypeScript.
  },
  // --- CONFIGURACIÓN DE JEST: Para pruebas unitarias ---
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src", // Le dice a Jest que busque las pruebas dentro de la carpeta /src.
    "testRegex": ".*\\.spec\\.ts$", // El patrón de nombres para los archivos de prueba.
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest" // Usa ts-jest para compilar los archivos de prueba.
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage", // Dónde guardar el reporte de cobertura.
    "testEnvironment": "node" // El entorno en el que se ejecutarán las pruebas.
  }
}