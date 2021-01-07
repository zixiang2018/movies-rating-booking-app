const dotenv = require('dotenv').config() // Required for getting env var
const env = process.env.NODE_ENV || 'development'

let url = ""
if (env.trim() == "test".trim()){
     url = process.env.MONGODB_APP_DATA_TEST
}else{
     url = process.env.MONGODB_APP_DATA
}


const mongoose = require("mongoose")
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
console.log(url)
db.url = url
db.movies = require("./movie.model.js")(mongoose)
db.actors = require("./actor.model.js")(mongoose)

module.exports = db