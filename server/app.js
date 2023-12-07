//importation des packages npm
require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const morgan = require("morgan");
const cors = require("cors"); 

//importation des routes
const apiRoutes = require("../server/routes/api");
const { errorhandling } = require("../server/middelware/errorMiddleware");

//app.use for des building package npm
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
const corsOptions = {
    origin: '*', // Replace with the allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  
  };
  
  app.use(cors(corsOptions));
  

//app.use for the API i create

app.use(apiRoutes);
app.use(errorhandling);

module.exports = app;
