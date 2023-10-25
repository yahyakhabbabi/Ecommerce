require("dotenv").config("");

const {
  PORT,
  DATABASE_URI,
  JWT_SECRET,
  MYEmail,
  Mypassword,
  Refresh_JWT_SECRET,
  Cloud_name,
  api_key,
  api_secret,
} = process.env;

module.exports = {
  PORT,
  DATABASE_URI,
  JWT_SECRET,
  MYEmail,
  Mypassword,
  Refresh_JWT_SECRET,
  Cloud_name,
  api_key,
  api_secret,
};
