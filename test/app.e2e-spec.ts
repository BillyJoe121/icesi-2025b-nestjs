// ========================================================================================
// ARCHIVO: test/app.e2e-spec.ts
// PROPÓSITO: Realizar una prueba End-to-End para verificar que la aplicación
//            se inicia correctamente y responde a una petición HTTP básica.
// ========================================================================================

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest'; // Supertest es la librería para simular peticiones HTTP.
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    // Se crea una instancia completa de la aplicación, igual que en main.ts.
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // `app.init()` inicia la aplicación (ejecuta los hooks de ciclo de vida, etc.).
    await app.init();
  });

  // La prueba en sí.
  it('/ (GET)', () => {
    // `request(app.getHttpServer())` usa supertest para hacer una petición al servidor de nuestra app.
    return request(app.getHttpServer())
      .get('/') // Realiza una petición GET a la ruta raíz.
      .expect(200) // Afirma que el código de estado de la respuesta debe ser 200 (OK).
      .expect('Hello World!'); // Afirma que el cuerpo de la respuesta debe ser exactamente 'Hello World!'.
  });
});