//importation des packages npm
require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser')
const app = express();


//importation des routes

//declaration des variables
const PORT = process.env.PORT || 3000;

//app.use for des building package npm
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))


//app.use for routes 




app.listen(PORT,()=>{
  console.log('listening in port',PORT);
})




