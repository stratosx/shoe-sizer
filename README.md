# shoe-sizer
shoe-sizer is a Node.js app that allows you to create and store fit rankings of shoes. It impliments express and knex and uses docker for ease of deployment.
# Setup

You will need docker and docker-compose installed to get this to run.
    - https://www.docker.com/get-started
    - https://docs.docker.com/compose/install/
Once that is done to get the app up and running run the following:
```sh
docker-compose up --build
```

# How to use
From there the endpoints you can hit are as follows

GET http://localhost:8080/shoes
    - gets a list of shoes
    - With an optional search param you can pass in as a query string
    - use this to get shoes id for other calls

POST http://localhost:8080/shoes
    - creates a new shoe
    - passing the shoe_name param in the body

PUT http://localhost:8080/shoes/:id/fit/ratings
    - stores the shoes rank
    - id is the shoe_id from the database
    - rank is passed in the body 1 - 5

GET http://localhost:8080/shoes/:id/fit/ratings
    - id is the shoe_id from the database
    - will return the trueToSizeCalculation

# Tests
Running the tests is easy, simply run the ```npm test``` command
