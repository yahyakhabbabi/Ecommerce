//importation des packages npm
require('dotenv').config('');
const mongoose = require('mongoose');
<<<<<<< HEAD
const app = express();
const connectDb = require('../server/config/database');

=======
const app = require('./app')
const connect = require('../server/config/database');
const {PORT} = require('../server/config/env')
>>>>>>> ac97f22729f6a456c7ce52437e44cbaa9d5af6b5




//declaration des variables
const port = process.env.PORT || 3000;







  app.listen(port, () => {console.log(`Server running on port ${port}`)
  connectDb()});







