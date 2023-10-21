require('dotenv').config()
const mongoose = require("mongoose");

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.URI)
        console.log('Connected to the database')

    } catch(err){
        console.error(err)
    }
}

module.exports = connectDb