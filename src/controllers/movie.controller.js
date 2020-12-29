const db = require("../models");
const Movie = db.movies;


// Retrieve all Movies from the database.
exports.findAll = (req, res) => {
    Movie.find({}, function (err, movies) {
        var movieMap = {};

        movies.forEach(function (movie) {
            movieMap[movie._id] = movie;
        });

        res.send(movieMap);
    });
};

// Find a single Movie with an title
exports.findOne = (req, res) => {
    const title = req.params.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Movie.find(condition)
        .then(data => {
            console.log(title)
            console.log(data)
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find top 10 movies
exports.findTopTen = (req, res) => {
    // const title = req.params.title;
    // var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    // Movie.find(condition)
    //     .then(data => {
    //         console.log(title)
    //         console.log(data)
    //         res.status(200).send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while retrieving tutorials."
    //         });
    //     });
};

// // Update a Movie by the id in the request
// exports.update = (req, res) => {

// };

// // Delete a Movie with the specified id in the request
// exports.delete = (req, res) => {

// };

// // Delete all Movies from the database.
// exports.deleteAll = (req, res) => {

// };

// // Find all published Movies
// exports.findAllPublished = (req, res) => {

// };