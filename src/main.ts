// ========================================================================================
// ARCHIVO: src/main.ts
// PROPÓSITO: Arrancar y configurar la aplicación NestJS. Es el equivalente al `index.js`
//            en una aplicación Node.js tradicional.
// ========================================================================================

import { NestFactory } from '@nestjs/core'; // La herramienta principal para crear una instancia de la aplicación.
import { AppModule } from './app.module';   // Importamos el módulo raíz de nuestra aplicación.
import { ValidationPipe } from '@nestjs/common'; // Importamos el 'Pipe' de validación.

// La función `bootstrap` es asíncrona porque la creación y el inicio de la app son procesos asíncronos.
async function bootstrap() {
  // `NestFactory.create(AppModule)` crea una instancia completa de la aplicación NestJS,
  // cargando el AppModule y resolviendo todas las dependencias.
  const app = await NestFactory.create(AppModule);

  // ----------------------------------------------------------------------------------------
  // ¡CONFIGURACIÓN GLOBAL CRUCIAL!
  // ----------------------------------------------------------------------------------------
  // `app.useGlobalPipes(...)` aplica un "Pipe" a TODAS las rutas de la aplicación.
  // Un Pipe es una clase que transforma o valida los datos de entrada.
  app.useGlobalPipes(
    new ValidationPipe({
      // `whitelist: true`: Esta opción elimina automáticamente cualquier propiedad
      // que se reciba en el body de la petición y que NO esté definida en el DTO.
      // Es una medida de seguridad para no procesar datos inesperados.
      whitelist: true,

      // `forbidNonWhitelisted: true`: Esta opción va un paso más allá. Si recibe una
      // propiedad que no está en el DTO, en lugar de solo eliminarla, RECHAZA la petición
      // completa con un error 400 (Bad Request). Esto te alerta de que el cliente
      // está enviando datos incorrectos.
      forbidNonWhitelisted: true,
    }),
  );
  // CONEXIÓN: Esta configuración es lo que hace que los decoradores de `class-validator`
  // en todos tus DTOs (CreateUserDto, CreateCarDto, etc.) funcionen automáticamente.

  // `app.listen()` inicia el servidor HTTP para que escuche peticiones.
  // Lee el puerto de las variables de entorno (`.env`). Si no está definido, usa el puerto 3000 por defecto.
  await app.listen(process.env.PORT ?? 3000);
}

// Ejecutamos la función para iniciar la aplicación.
bootstrap();