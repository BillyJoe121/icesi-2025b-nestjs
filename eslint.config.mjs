// ========================================================================================
// ARCHIVO: eslint.config.mjs
// PROPÓSITO: Configurar ESLint para analizar el código y forzar buenas prácticas.
//            El formato .mjs indica que es un Módulo de JavaScript (ES Module).
// ========================================================================================
// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// La configuración se exporta como un arreglo de objetos de configuración.
export default tseslint.config(
  // Ignora este mismo archivo de la revisión de ESLint.
  {
    ignores: ['eslint.config.mjs'],
  },
  // Carga las reglas recomendadas por ESLint.
  eslint.configs.recommended,
  // Carga las reglas recomendadas para TypeScript, incluyendo las que requieren información de tipos.
  ...tseslint.configs.recommendedTypeChecked,
  // Integra Prettier. Esto hace que los errores de formato de Prettier se reporten como errores de ESLint.
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      // Define variables globales que ESLint no debe marcar como no definidas.
      globals: {
        ...globals.node, // Variables de entorno de Node.js (ej: `process`, `require`).
        ...globals.jest, // Variables de Jest (ej: `describe`, `it`, `expect`).
      },
      sourceType: 'commonjs', // Define el sistema de módulos.
      // Configuración del parser de TypeScript.
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // Bloque para personalizar reglas.
  {
    rules: {
      // ⚠️ ERROR TRAMPA: El profesor podría eliminar estas líneas. Si lo hace,
      // ESLint se volverá muy estricto y podría marcar muchos errores en el código
      // por usar `any` o no manejar `await` en promesas, forzándote a corregirlos.

      // `@typescript-eslint/no-explicit-any`: 'off' -> Permite el uso del tipo `any`.
      '@typescript-eslint/no-explicit-any': 'off',
      // `@typescript-eslint/no-floating-promises`: 'warn' -> Muestra una advertencia si llamas a una
      // función `async` sin usar `await`, lo que podría ocultar errores no manejados.
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn'
    },
  },
);