# Temperature API

## Pre-requisites

- Docker compose
- Node 14

## Steps

### 1. Start MongoDB with Docker compose  

`$ docker-compose up`

### 2. Install npm packages

`$ npm i`

### 3. Setup the environment

`$ cp .env.example .env`

### 3. Start the API

`$ npm start`

### 4. Visit Swagger UI

Visit [Swagger UI](http://localhost:3030/api-docs/) and try the different methods. Examples are provided in Swagger UI.

For example following order would be useful order.
1. POST /sensors
2. GET /sensors
3. GET /sensor/:sensorId
4. POST /sensor/:sensorId/data
5. GET /data

