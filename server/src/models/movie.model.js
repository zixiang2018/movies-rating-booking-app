module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String,
            movie_year: String,
            rating: Number,
            num_of_ratings: Number,
            thumbnail_url: String,
            actors: Array
        },
    )

    // If you use this app with a front-end that needs id field instead 
    // of _id, you have to override toJSON method that map default object 
    // to a custom object
    //https://stackoverflow.com/questions/7034848/mongodb-output-id-instead-of-id
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject()
        object.id = _id // "id" field instead "of _id"
        return object
    })
    const Movie = mongoose.model("movie", schema)

    return Movie
}