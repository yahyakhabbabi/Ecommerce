require('dotenv').config()
const mongoose = require("mongoose");
const { DATABASE_URI } = require('./env');

const connectDb = async()=>{
    try {
        await mongoose.connect(DATABASE_URI)
        console.log('Connected to the database')

    } catch(err){
        console.error(err)
    }
}

module.exports = connectDb