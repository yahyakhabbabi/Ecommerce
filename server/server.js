//importation des packages npm
require('dotenv').config('');



const connectDb = require('../server/config/database');


const app = require('./app')
const connect = require('../server/config/database');
const {PORT} = require('../server/config/env')





//declaration des variables
const port = process.env.PORT || 3000;







  app.listen(port, () => {console.log(`Server running on port ${port}`)
  connectDb()});







