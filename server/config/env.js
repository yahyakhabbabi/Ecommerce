require('dotenv').config('');

const { PORT ,DATABASE_URI,JWT_SECRET,MYEmail,Mypassword,Refresh_JWT_SECRET} = process.env;


module.exports = { PORT,DATABASE_URI,JWT_SECRET,MYEmail,Mypassword,Refresh_JWT_SECRET }