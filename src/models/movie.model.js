module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String,
            rating: String,
            thumbnail_url: String,
            actors: Array
        },
    );

    // If you use this app with a front-end that needs id field instead 
    // of _id, you have to override toJSON method that map default object 
    // to a custom object
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Movie = mongoose.model("movie", schema);

    return Movie;
};