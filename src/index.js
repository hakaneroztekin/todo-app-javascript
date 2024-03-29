// load express into our project
const express = require('express');

// dependency to use JSON with HTTP requests & responses
const bodyParser = require('body-parser');

// mysql
const mysql = require('mysql2');

// config with .env variables
const {host, port, database, username, password} = require('../config');

const connection = mysql.createConnection({
    host: host,
    database: database,
    user: username,
    password: password
});

try {
    connection.connect();
} catch (e) {
    console.log("Connection to database is failed");
    console.log(e);
}

// set up the api 
const api = express();
// use bodyParser
api.use(bodyParser.urlencoded({
    extended: true
}));
api.use(bodyParser.json());
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

api.use(express.static(__dirname, {index: 'index.html'}));

/*
 * listen at port 3000
 * Because it's running locally,
 * it'll serve at localhost:3000
 * and when the server starts, run the function
 * To start the server, use this command in the console,
 * node ./src/index.js
 * Also, since we've added 'api' script to package.json,
 * we can run api with; npm run api
*/
api.listen(port, () => {
    console.log('API is up and running');
    console.log('http://' + host + ":" + port);
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
    console.log(req.body);

    let queryString = "INSERT INTO tasks (description) VALUES (?)";
    connection.query(queryString, [req.body.description], (error, results) => {
        if (error) return console.log("Error happened in query " + error);
        connection.query('SELECT LAST_INSERT_ID() FROM tasks', (error, results) => {
            if (error) return console.log("Error happened in query " + error);

            // id of the inserted element
            // id will be used for updating the item
            let id = results[0]['LAST_INSERT_ID()'];
            res.json({
                id: id,
                description: req.body.description
            });
            res.send();
        })
    });
});

// update item
api.put('/tasks/:id/update', (req, res) => {
    let endpoint = '/tasks/' + req.params.id + '/update';
    console.log("Request to " + endpoint + " is received");
    console.log(req.body);

    let queryString = "UPDATE tasks SET completed = ? WHERE id = ?"
    connection.query(queryString, [req.body.completed, req.params.id], (error, results) => {
        if (error) return console.log("Error happened in query " + error);
    });
});

// get items
api.get('/tasks', (req, res) => {
    console.log("Request to /tasks is received");

    let queryString = "SELECT * FROM tasks ORDER BY creation_date DESC";
    connection.query(queryString, (error, results) => {
        if (error) return console.log("Error happened in query " + error);

        res.json({
            todo: results.filter((task) => !task.completed),
            completed: results.filter((task) => task.completed)
        });
    });
});

// delete item
api.delete('/remove', (req, res) => {
    console.log("Request to /remove is received");
    console.log(req.body);

    let queryString = "DELETE FROM tasks WHERE id = " + req.body.id;

    connection.query(queryString, (error) => {
        if (error) return console.log("Error happened in query " + error);
    });
});