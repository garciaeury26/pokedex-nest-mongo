<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

## Instala la cli de nest
```
npm i -g @nest/cli
```

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

# Ejecturar Docker

```bash
# levantar base de datos

docker-compose up -d
```

# Clonar el archivo .env.template
*Remobra el archivo a .env*

# Llena las variables de entorno con la data correspondiente
```
MONGODB=mongodb://localhost:27017/nest-pokemon
PORT=3000
SECRET_KEY= your data
JWT_SEE= your data
````

# Recontruir la base de datis con la semilla
```
http://localhost:3000/api/v1/seed
```

## Stack Usado
* MongoDB
* Nest
* TypeScript
* Docker# pokedex-nest-mongo
