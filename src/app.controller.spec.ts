// ========================================================================================
// ARCHIVO: src/app.controller.spec.ts
// PROPÓSITO: Contener las pruebas unitarias para AppController. El sufijo `.spec.ts`
//            es la convención que usa Jest (el framework de pruebas) para encontrar los archivos de test.
// ========================================================================================

import { Test, TestingModule } from '@nestjs/testing'; // Utilidades de NestJS para crear un entorno de prueba.
import { AppController } from './app.controller';
import { AppService } from './app.service';

// `describe` agrupa un conjunto de pruebas relacionadas.
describe('AppController', () => {
  let appController: AppController;

  // `beforeEach` es un hook de Jest que se ejecuta antes de cada prueba (`it`) en este bloque `describe`.
  beforeEach(async () => {
    // `Test.createTestingModule` crea un módulo de NestJS "falso" o de prueba.
    // Aquí declaramos los controladores y proveedores necesarios para esta prueba,
    // imitando la configuración de un módulo real.
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile(); // `compile()` prepara el módulo y sus dependencias.

    // Obtenemos una instancia del controlador desde nuestro módulo de prueba.
    appController = app.get<AppController>(AppController);
  });

  // Otro `describe` para agrupar pruebas sobre un método o funcionalidad específica.
  describe('root', () => {
    // `it` define una prueba individual. La descripción debe explicar qué se espera que pase.
    it('should return "Hello World!"', () => {
      // `expect` es la función de Jest para hacer afirmaciones.
      // `appController.getHello()` ejecuta el método que queremos probar.
      // `.toBe('Hello World!')` es el "matcher". Comprueba si el resultado es exactamente 'Hello World!'.
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});