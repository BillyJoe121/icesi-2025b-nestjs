### **Simulacro de Parcial: Módulo `Publishers` (Editoriales)**

**Objetivo:** Crear un nuevo módulo desde cero para gestionar editoriales (`Publishers`). Deberás implementar un CRUD completo, aplicar validaciones y añadir una pequeña lógica de negocio específica.

**Tiempo Sugerido:** 45-60 minutos.

---

#### **Requerimientos:**

**1. Crear el Módulo `Publishers`**
* Usa la CLI de NestJS para generar el módulo, controlador y servicio para `publishers`.

**2. Crear la Entidad `Publisher`**
* Define la entidad `Publisher` (`publisher.entity.ts`) con las siguientes propiedades:
    * `id`: UUID, llave primaria autogenerada.
    * `name`: `string`, debe ser único.
    * `headquarters`: `string` (ej: "New York, USA").
    * `foundationYear`: `number`.

**3. Crear los DTOs (Data Transfer Objects)**
* **`create-publisher.dto.ts`**:
    * `name`: Debe ser un `string` con una longitud mínima de 3 caracteres.
    * `headquarters`: Debe ser un `string`.
    * `foundationYear`: Debe ser un número entero (`@IsInt`), positivo (`@IsPositive`) y no puede ser un año futuro (usa `@Max` con el año actual).
* **`update-publisher.dto.ts`**:
    * Debe permitir la actualización parcial de los datos (todos los campos son opcionales). Usa la estrategia más eficiente que conoces para crear este DTO.

**4. Implementar el Servicio (`publishers.service.ts`)**
* Implementa la lógica para un CRUD completo:
    * `create(createPublisherDto)`: Crea y guarda una nueva editorial.
    * `findAll(paginationDto)`: Devuelve una lista paginada de todas las editoriales.
    * `findOne(id: string)`: Busca una editorial por su ID (debe ser un UUID).
    * `update(id: string, updatePublisherDto)`: Actualiza una editorial.
    * `remove(id: string)`: Elimina una editorial.
    * **Maneja los errores `NotFoundException`** si se intenta buscar, actualizar o eliminar una editorial que no existe.

**5. Implementar el Controlador (`publishers.controller.ts`)**
* Crea los endpoints correspondientes para cada método del servicio:
    * `POST /publishers`
    * `GET /publishers` (debe aceptar query params de paginación)
    * `GET /publishers/:id`
    * `PATCH /publishers/:id`
    * `DELETE /publishers/:id`
* Usa los `Pipes` adecuados (`ParseUUIDPipe`, `ValidationPipe` global) para validar los parámetros y el body.

**6. Integrar el Módulo**
* **¡No lo olvides!** Importa tu nuevo `PublishersModule` en el `app.module.ts` para que la aplicación lo reconozca.

---

**¡Tómate tu tiempo, sigue los pasos y usa el módulo `brands` como tu principal guía!**

Cuando termines, pásame el contenido de los archivos que has creado (`publisher.entity.ts`, los DTOs, `publishers.service.ts`, `publishers.controller.ts` y `publishers.module.ts`), y los revisaré uno por uno para darte una retroalimentación detallada.

¡Mucha suerte! Aquí estaré esperando tu solución.