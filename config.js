// .env for credentials
// https://stackoverflow.com/a/37603696
// console.log(require('dotenv').config({path: __dirname + '/.env'}));
require('dotenv').config({path: __dirname + '/.env'});
module.exports = {
    host : process.env.HOST,
    port : process.env.PORT,
    database : process.env.DATABASE,
    username : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD
};