// load express into our project
const express = require('express');

// set up the api 
const api = express();

/*
 * nextAction provides what to execute after this function
 * if we dont use it, page will execute the function below
 * but it will stuck on loading phase because
 * no next function is provided
 * details of request and response provided below
 * more on this, you can check out: "Express Middleware"
 */
// api.use((request, response, nextAction) => {
//     console.log("Hellö");
//     nextAction();
// });

api.use(express.static(__dirname,  { index: 'index.html' }));

/*
 * listen at port 3000
 * Because it's running locally,
 * it'll serve at localhost:3000
 * and when the server starts, run the function
 * To start the server, use this command in the console,
 * node ./src/index.js
*/
api.listen(3000, () => {
    console.log('API is up and running');
    console.log('http://localhost:3000');
});

/*
 * When the URL ('/') is requested, run the method
 * Log the request, send response "Hello World"
 * After running the api, if we go to localhost:3000
 * at the browser, we'll see the response message :)
*/
// api.get('/', (request, response) => {
// //    console.log(request); // prints a lot of info about the request
//     response.send("Hello world");
// });

// Post request when we add a new item
api.post('/add', (req, res) => {
    console.log("Request to /add is received");
    res.send("add item");
});