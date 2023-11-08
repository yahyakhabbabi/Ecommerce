//importation des packages npm

const mongoose = require("mongoose");
const app = require("./app");
const connect = require("../server/config/database");
const { PORT } = require("../server/config/env");

//declaration des variables
const port = PORT || 3000;

connect();

mongoose.connection.once("open", () => {
  console.log("connected to Mongodb");
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
