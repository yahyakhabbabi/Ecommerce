require('dotenv').config('');

const { PORT ,DATABASE_URI} = process.env;


module.exports = { PORT,DATABASE_URI }