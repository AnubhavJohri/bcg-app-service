const express = require('express');
const policy_router= require('./routes/PolicyRouter');
const bodyParser = require("body-parser");
const app = express();
const errorLogger = require("./utilities/errorLogger");
const requestLogger = require("./utilities/requestLogger");
const cors = require('cors') ;
const PORT = process.env.PORT || 1111;


app.use(cors()); 
app.use(bodyParser.json());
app.use(requestLogger);
app.use('/policy', policy_router);
app.use(errorLogger);
app.listen(PORT, () => console.log(`Listening on port ${ PORT }`))
