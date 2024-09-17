#  Spotify Web Api Integration
## Description
This application is responsible for album sales and calculates points for customers based on points on the days of the week

## Install Guide
git clone https://github.com/bc-fullstack-05/carlos_germano_andrade_da_fonseca.git

Install maven projects using:
`mvn clean install`
Before run the docker compose, make sure to package the maven projects using:
`mvn clean package`

Now, you need to build docker images, in the root repository folder type:
`docker compose build`
to get the containers running, type:
`docker compose up -d`
now everything's should be up and working

## Routes:
Docs:

  ```http request
    http://localhost:8080/api/swagger-ui/index.html
```
## Technology used:
+ Spring
+ PostgreSQL
+ Swagger
+ Docker
+ Maven
  
Developed to SysMap Bootcamp 2024 - Backend Project - Carlos Germano Andrade
