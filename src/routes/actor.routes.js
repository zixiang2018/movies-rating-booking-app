module.exports = app => {
    const actors = require("../controllers/actor.controller.js");

    var router = require("express").Router();

    // Retrieve all actors
    router.get("/", actors.findAll);

    // Retrieve one actor
    router.get("/:name", actors.findOne);


    app.use('/api/actors', router);
};