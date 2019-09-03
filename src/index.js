// load express into our project
const express = require('express');

// set up the api 
const api = express();


/*
 * listen at port 3000
 * Because it's running locally, it's at localhost:3000
 * and when the server starts, run the function
 * To start it: use this command in the console,
 * node todo-app-javascript>node ./src/index.js
*/
api.listen(3000, () => {
    console.log('API is up and running');
});


/*
 * When the URL ('/') is requested, run the method
 * Log the request, send response "Hello World"
 * After running the api, if we go to localhost:3000
 * at the browser, we'll see the response message :)
*/
api.get('/', (request, response) => {
    console.log(request);
    response.send("Hello world");
})