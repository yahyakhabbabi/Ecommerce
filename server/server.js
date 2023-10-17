//importation des packages npm
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connect = require('../server/config/database');
const {PORT} = require('../server/config/env')


//declaration des variables
const port = PORT || 3000;


connect()



mongoose.connection.once('open',()=>{
  console.log('connected to Mongodb');
  app.listen(port, () => console.log(`Server running on port ${port}`));

})





