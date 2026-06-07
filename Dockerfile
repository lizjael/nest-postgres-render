# services:
#   postgres:
#     image: postgres:15-alpine
#     container_name: postgres_db
#     restart: always
#     environment:
#       POSTGRES_USER: postgres
#       POSTGRES_PASSWORD: root
#       POSTGRES_DB: db_crud
#     volumes:
#       - postgres_data:/var/lib/postgresql/data
#     ports:
#       - '5433:5432'
#     healthcheck:
#       test: ['CMD-SHELL', 'pg_isready -U postgres -d db_crud']
#       interval: 10s
#       timeout: 5s
#       retries: 5

# volumes:
#   postgres_data:
FROM node:22-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/main.js"]
#RUN npm install
