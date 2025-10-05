// ========================================================================================
// ARCHIVO: nest-cli.json
// PROPÓSITO: Configurar el comportamiento de la Interfaz de Línea de Comandos (CLI) de NestJS.
// ========================================================================================
{
  "$schema": "https://json.schemastore.org/nest-cli",
  // "collection": Le dice a la CLI qué "esquemáticos" (plantillas) usar al generar código.
  // `@nestjs/schematics` es la colección por defecto.
  "collection": "@nestjs/schematics",
  // "sourceRoot": Le indica a la CLI dónde se encuentra el código fuente principal de la aplicación.
  // ⚠️ ERROR TRAMPA: Si el profesor cambia esto a, por ejemplo, "app", los comandos `nest generate`
  // intentarían crear archivos en la carpeta incorrecta.
  "sourceRoot": "src",
  "compilerOptions": {
    // "deleteOutDir": Cuando ejecutas `nest build` o `nest start`, esta opción asegura
    // que la carpeta `dist` se elimine por completo antes de cada nueva compilación.
    // Esto previene que archivos viejos o eliminados permanezcan en el build final.
    "deleteOutDir": true
  }
}