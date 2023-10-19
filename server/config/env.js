require('dotenv').config('');

const { PORT ,DATABASE_URI,JWT_SECRET} = process.env;


module.exports = { PORT,DATABASE_URI,JWT_SECRET }