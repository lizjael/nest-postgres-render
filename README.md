# 🛒 API REST - Sistema de Gestión de Pedidos

Backend desarrollado con **NestJS**, **TypeORM** y **PostgreSQL**. Incluye módulos de Clientes, Categorías, Productos, Órdenes y Orden-Producto con documentación automática via Swagger.

---

## 📋 Requisitos Previos

Asegúrate de tener instalado lo siguiente antes de continuar:

- [Node.js](https://nodejs.org/) v18 o superior
- [npm](https://www.npmjs.com/) v9 o superior
- [PostgreSQL](https://www.postgresql.org/) v14 o superior

---

## 🗄️ Configuración de la Base de Datos

1. Abre tu cliente de PostgreSQL (pgAdmin, DBeaver, psql, etc.) y crea la base de datos:

```sql
CREATE DATABASE db_crud;
```

2. Verifica que el usuario y la contraseña coincidan con los valores en `src/app.module.ts`:

```ts
host: 'localhost',
port: 5433,        // ← puerto de tu instancia PostgreSQL
username: 'postgres',
password: 'root',
database: 'db_crud',
```

> **Nota:** Si tu instancia corre en el puerto por defecto (`5432`) o usas credenciales distintas, actualiza estos valores antes de iniciar el servidor.

---

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone <https://github.com/lizjael/nest-postgres-tienda.git>

```

### 2. Instalar dependencias

```bash
npm install
yarn install
```

### 3. Ejecutar en modo desarrollo

```bash
npm run start:dev
yarn start:dev
```

El servidor se iniciará en `http://localhost:3000` con recarga automática ante cambios.

### Otros comandos disponibles

| Comando              | Descripción                        |
| -------------------- | ---------------------------------- |
| `npm run start`      | Inicia el servidor en modo normal  |
| `npm run start:dev`  | Inicia con watch mode (desarrollo) |
| `npm run start:prod` | Ejecuta el build de producción     |
| `npm run build`      | Compila el proyecto                |
| `npm run test`       | Ejecuta los tests unitarios        |
| `npm run test:cov`   | Ejecuta tests con cobertura        |

---

## 📚 Documentación de la API

Una vez el servidor esté corriendo, accede a la documentación interactiva en:

```
http://localhost:3000/docs
```

Todos los endpoints están documentados con descripciones, ejemplos de body y respuestas posibles (200, 201, 400, 404).

---

## 🗂️ Endpoints Disponibles

La URL base de todos los endpoints es: `http://localhost:3000/api/v1`

### Clientes — `/clientes`

| Método   | Endpoint        | Descripción                    |
| -------- | --------------- | ------------------------------ |
| `GET`    | `/clientes`     | Listar todos los clientes      |
| `GET`    | `/clientes/:id` | Obtener un cliente por ID      |
| `POST`   | `/clientes`     | Crear un nuevo cliente         |
| `PATCH`  | `/clientes/:id` | Actualizar datos de un cliente |
| `DELETE` | `/clientes/:id` | Eliminar un cliente            |

### Categorías — `/categorias`

| Método   | Endpoint          | Descripción                                          |
| -------- | ----------------- | ---------------------------------------------------- |
| `GET`    | `/categorias`     | Listar todas las categorías                          |
| `GET`    | `/categorias/:id` | Obtener una categoría por ID (incluye sus productos) |
| `POST`   | `/categorias`     | Crear una nueva categoría                            |
| `PATCH`  | `/categorias/:id` | Actualizar una categoría                             |
| `DELETE` | `/categorias/:id` | Eliminar una categoría                               |

### Productos — `/productos`

| Método   | Endpoint         | Descripción                                          |
| -------- | ---------------- | ---------------------------------------------------- |
| `GET`    | `/productos`     | Listar todos los productos                           |
| `GET`    | `/productos/:id` | Obtener un producto por ID (incluye su categoría)    |
| `POST`   | `/productos`     | Crear un producto (requiere `idCategoria` existente) |
| `PATCH`  | `/productos/:id` | Actualizar un producto                               |
| `DELETE` | `/productos/:id` | Eliminar un producto                                 |

### Órdenes — `/ordenes`

| Método   | Endpoint       | Descripción                                      |
| -------- | -------------- | ------------------------------------------------ |
| `GET`    | `/ordenes`     | Listar todas las órdenes                         |
| `GET`    | `/ordenes/:id` | Obtener una orden con todos sus productos        |
| `POST`   | `/ordenes`     | Crear una orden (requiere `idCliente` existente) |
| `PATCH`  | `/ordenes/:id` | Actualizar el estado de una orden                |
| `DELETE` | `/ordenes/:id` | Eliminar una orden                               |

### Orden-Producto — `/orden_producto`

| Método   | Endpoint                                   | Descripción                                  |
| -------- | ------------------------------------------ | -------------------------------------------- |
| `GET`    | `/orden_producto`                          | Listar todos los registros de orden-producto |
| `GET`    | `/orden_producto/:id`                      | Obtener un registro con sus productos        |
| `POST`   | `/orden_producto`                          | Crear un registro (incluye `idOrden`)        |
| `PATCH`  | `/orden_producto/:id`                      | Actualizar cantidad o precio unitario        |
| `DELETE` | `/orden_producto/:id/productos/:productId` | Quitar un producto de una orden              |

---

## 🏗️ Estructura del Proyecto

```
src/
├── app.module.ts
├── main.ts
├── clientes/
│   ├── clientes.controller.ts
│   ├── clientes.service.ts
│   ├── clientes.module.ts
│   ├── entities/
│   └── dto/
├── categorias/
│   ├── categorias.controller.ts
│   ├── categorias.service.ts
│   ├── categorias.module.ts
│   ├── entities/
│   └── dto/
├── productos/
├── ordenes/
└── orden_producto/
```

---

## ⚙️ Variables de Entorno (Opcional)

Si prefieres no hardcodear las credenciales, puedes crear un archivo `.env` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=root
DB_NAME=db_crud
PORT=3000
```

Y actualizar `app.module.ts` para leerlas con `process.env.*`.

---

## 🛡️ Consideraciones de Seguridad

- La API usa `ValidationPipe` global con `whitelist: true` para rechazar campos no declarados en los DTOs.
- Los endpoints están protegidos con **JWT Bearer Auth** (configurado en Swagger). Para consumir endpoints protegidos, incluye el token en el header:
  ```
  Authorization: Bearer <tu_token>
  ```
- El `synchronize: true` en TypeORM es conveniente para desarrollo, pero **debe desactivarse en producción**.
