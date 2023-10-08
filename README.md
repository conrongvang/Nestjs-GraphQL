## Installation

```bash
$ npm install
```

## Init .env file

```sh
$ touch .env
```

Copy and paste the following

```env
# local ports
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=stock
HOST_PORT=5001
ALPHAVANTAGE_STOCK_API_KEY=LWIZAWFQZDQKDVEV

```

## Running the app

```bash

## ================================================
## docker
## ================================================
$ docker-compose up -d

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## formatter,linter,typecheck

```sh
## formatter
$ npm run format

## linter
$ npm run lint

## typecheck
$ npm run typecheck
```

## Stay in touch

- Author - [Nguyen Long](https://www.facebook.com/nothing.to.look.at.79)
- Phone - 84 354 310 633
