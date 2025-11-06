# Votos Backend

API backend en Node.js + Express + TypeScript y Sequelize (PostgreSQL) para gestionar votos y endpoints.

## Requisitos

- Node.js >= 18
- npm >= 9
- Docker y Docker Compose (recomendado para PostgreSQL)
- DBeaver (opcional) para visualizar la base de datos

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto basado en `.env.example`:

```env
PORT=3001
POSTGRES_USER=andy
POSTGRES_PASSWORD=holamundi
POSTGRES_DB=bdVotes
PGDATA=/var/lib/postgresql/data/pgdata
PGHOST=localhost
PGPORT=5433
NODE_ENV=development
```

## Levantar PostgreSQL con Docker

Archivo `docker-compose.yaml` expone la DB en el host `localhost:5433`:

```bash
# Levantar en segundo plano
docker compose up -d

# Ver contenedores
docker compose ps
```

Si tienes Postgres local en 5432 y no quieres usar Docker, ajusta `PGHOST`/`PGPORT` en `.env` para apuntar a tu instancia.

## Instalación de dependencias

```bash
npm install
```

## Scripts disponibles

- Desarrollo con ts-node + nodemon
  ```bash
  npm run start:dev
  ```
  Inicia el servidor y recarga al guardar. Debes ver en consola algo como:
  `Database connection has been established successfully.` y `Server running on http://localhost:3001`.

- Compilar a JavaScript (dist/)
  ```bash
  npm run build
  ```

- Ejecutar compilado
  ```bash
  npm start
  ```
  Equivale a `node dist/main.js`.

## Licencia

Este proyecto usa licencia MIT. Ver archivo `LICENSE`.
