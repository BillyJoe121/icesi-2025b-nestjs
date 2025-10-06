
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
