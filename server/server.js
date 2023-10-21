//importation des packages npm
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connectDb = require('../server/config/database');



//declaration des variables
const port = process.env.PORT || 3000;







  app.listen(port, () => {console.log(`Server running on port ${port}`)
  connectDb()});







