import { Injectable } from '@nestjs/common';

// @Injectable() marca esta clase como un "proveedor" que puede ser inyectado en otros
// componentes (como el AppController).
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}