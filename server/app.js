//importation des packages npm
require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser')
const app = express();


//importation des routes
// const userRoute = require('../server/routes/UserRoute');
// const customerRoute = require('../server/routes/customerRoute');
// const categorieRoute = require('../server/routes/categorieRoute');
// const subcategorieRoute = require('../server/routes/SubcategorieRoute');
const productRoute = require('../server/routes/productRoute');
const orderRoute = require('../server/routes/orderRoute');



//app.use for des building package npm
app.use(express.json())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))

//app.use for the API i create

// app.use('/v1/users',userRoute);
// app.use('/v1/customers',customerRoute);
// app.use('/v1/categories',categorieRoute);
// app.use('/v1/subcategories',subcategorieRoute);
app.use('/v1/products',productRoute);
app.use('/v1/orders',orderRoute);


module.exports=app;