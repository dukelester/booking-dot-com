# Hotel Booking

A simple Node.js application backend for hotel booking would consist of a server that listens for incoming requests from a client (such as a web application or mobile app) and performs actions on a database of hotel information. The server would use Node.js to handle incoming requests and route them to the appropriate functions for handling. The application would allow users to search for available hotels, view details about specific hotels, and book reservations. The database would store information about hotels, such as their location, available rooms, and pricing. The backend would also handle the payment process and send confirmations to the user.

## API Testing with Jest and SuperTest

`End-to-end` testing - a type of test which tests that the flow of an application from start to finish works as expected. This is also known as functional testing. An example of this type of test is testing an endpoint or a route which involves testing everything needed for the endpoint to work such as database connection, dependencies, etc.

Test Runner - a library or tool which picks up source code (tests) in a given directory or file, executes the test and write the result to the console or any specified location, example Jest, Mocha.

`Jest` - Jest is a JavaScript testing framework developed by Facebook. It works out of the box with minimal configuration and has in-built test runner, assertion library and mocking support.

`Supertest` - A library for testing Node.js HTTP servers. It enables us to programmatically send HTTP requests such as GET, POST, PATCH, PUT, DELETE to HTTP servers and get results.

### Install Jest and supertest

Open your terminal and cd to the project root directory and run the command below:
`npm install --save-dev jest supertest`

## Testing the API Endpoints

Now that we have got the test environment set up, it is time to start testing the API endpoints. Since our endpoint needs to make a request to the database, we need to set up a test database. The reason for setting up a test database is that we'll be dropping the database each time we run a test. Dropping the database each time the test is run ensures the integrity of the test. That is, if a test is about creating a post record in the database, we want to be sure that there was no post record in the database before the test was run, that way, we are sure of the result got from the test.

Route ==> `Middleware => Controller => Service => Model` => MongoDb
