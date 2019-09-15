// .env for credentials
// https://stackoverflow.com/a/37603696
// console.log(require('dotenv').config({path: __dirname + '/.env'}));
require('dotenv').config({path: __dirname + '/.env'});
module.exports = {
    username : process.env.DATABASE_USERNAME,
    password : process.env.DATABASE_PASSWORD
};