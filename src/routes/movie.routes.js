module.exports = app => {
    const movies = require("../controllers/movie.controller.js")

    var router = require("express").Router()

    // Retrieve all Movies
    router.get("/", movies.findAll)

    // Retrieve a single Movie with id
    router.get("/:title", movies.findOne)

    // Retrieve top ten movies currently
    router.get("/findMoviesByYear/:movie_year", movies.findMoviesByYear)

    app.use('/api/movies', router)
}