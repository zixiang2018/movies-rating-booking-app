module.exports = app => {
    const movies = require("../controllers/movie.controller.js");

    var router = require("express").Router();

    // // Create a new Tutorial
    // router.post("/", movies.create);

    // Retrieve all Movies
    router.get("/", movies.findAll);

    // // Retrieve all published Movies
    // router.get("/published", movies.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:title", movies.findOne);

    // Retrieve top ten movies currently
    router.get("/getTopTen", movies.findTopTen)

    // // Update a Tutorial with id
    // router.put("/:id", movies.update);

    // // Delete a Tutorial with id
    // router.delete("/:id", movies.delete);

    // // Create a new Tutorial
    // router.delete("/", movies.deleteAll);

    app.use('/api/movies', router);
};