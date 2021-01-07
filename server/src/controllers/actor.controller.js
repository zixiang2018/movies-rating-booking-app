const db = require("../models")
const Actor = db.actors


// Retrieve all Actors from the database.
exports.findAll = (req, res) => {
    Actor.find({}, function (err, actors) {
        var actorMap = {}

        actors.forEach(function (actor) {
            actorMap[actor._id] = actor
        })

        res.send(actorMap)
    })
}

// Find a single Movie with an name
exports.findOne = (req, res) => {
    const name = req.params.name
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {}
    Actor.find(condition)
        .then(data => {
            // console.log(name)
            // console.log(data)
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving movies."
            })
        })
}
