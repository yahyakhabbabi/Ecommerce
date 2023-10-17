require('dotenv').config('');

const { PORT ,DATABASE_URI} = process.env;
console.log(DATABASE_URI);

module.exports = { PORT,DATABASE_URI }