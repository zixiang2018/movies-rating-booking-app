const dotenv = require('dotenv').config() // Required for getting env var
const url = process.env.MONGODB_APP_DATA;

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = url;
db.movies = require("./movie.model.js")(mongoose);

module.exports = db;