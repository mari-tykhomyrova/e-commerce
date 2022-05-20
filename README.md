## Description
NodeJS API (NestJS, Prisma, PostgreSQL) for E-commerce site

## Installation
```bash
$ npm install
```

## Running the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Migration and Seeding
```bash
# format code in prisma/schema.prisma
$ prisma format

# generate prisma/client data
$ prisma generate

# generate migration based on schema
$ npx prisma migrate dev --name init

# run seeding
$ npx prisma db seed
```

## Api
[Default localhost Application API](http://localhost:3000/)<br>
[Default localhost Swagger API](http://localhost:3000/api/)<br>
[Default localhost Swagger API JSON](http://localhost:3000/api-json/)
