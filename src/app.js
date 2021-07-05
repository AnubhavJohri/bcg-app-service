/**
 * Entry Point of the application
 * Contains all the custom-built/predefined middlewares
 */

const express = require('express');
const policy_router= require('./routes/PolicyRouter');
//Predefined Middleware parses the received body data in application/json format
const bodyParser = require("body-parser");
const app = express();
//Custom Build Middleware used to log errors in the app
const errorLogger = require("./utilities/errorLogger");
//Custom Build Middleware used to log coming-in requests in the app
const requestLogger = require("./utilities/requestLogger");
//Predefined Middleware used to handle CORS issue
const cors = require('cors') ;
//Used to keep the port dynamic for production env and 1111 for local
const PORT = process.env.PORT || 1111;


app.use(cors()); 
app.use(bodyParser.json());
app.use(requestLogger);
/**
 * Entrypoint for all our routes
 * Contains in total 4 routes
 * 1.)To setup the db
 * 2.)To fetch information of policy-id
 * 3.)To fetch policies/month for each region
 * 4.)To Update the policy details
 * 5.)To get all the unique regions in the record
*/
app.use('/policy', policy_router);
app.use(errorLogger);
app.listen(PORT, () => console.log(`Listening on port ${ PORT }`))

//add something new instead