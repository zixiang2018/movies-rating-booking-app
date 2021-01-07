module.exports = app => {
    const movies = require("../controllers/movie.controller.js")

    var router = require("express").Router()

    // Retrieve all Movies
    router.get("/", movies.findAll)

    // Retrieve a single Movie with id
    router.get("/getMovieByTitle/:title", movies.findOne)

    // Retrieve movies by year currently
    router.get("/findMoviesByYear/:movie_year", movies.findMoviesByYear)

    // Retrieve all unique years in movie db
    router.get("/getYears", movies.getYears)

    app.use('/api/movies', router)
}