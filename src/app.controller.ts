import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// @Controller() sin argumento define que este controlador manejará la ruta raíz ('/').
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // @Get() define que este método maneja peticiones GET a la ruta raíz.
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}