const express = require("express")
const app = express()

// app.get("/", (req, res) => {
//     console.log("Responding to root route")
//     res.send("This is my root!")
// })

// app.get("/users", (req, res) => {
//     console.log("Responding to users route")
//     var user1 = { firstName: "Adam", lastName: "Lee" }
//     var user2 = { firstName: "Bob", lastName: "Tan" }
//     res.json([user1, user2])
// })

// - Discovery - users of your website can view the top 10 movies of the year at a glance
// [Endpoint] for top10 movies


// - Research - users can compare movie metadata, such as ratings, actors, etc. in order to select
// a film to screen
// [Endpoint] for retrieving a movie

// - Booking - users are able to proceed to purchase tickets to the desired movie via a button (the
// button’s implementation is not required, the button can redirect the user to or another 3rd
// -party website)

//http://localhost:3000/
app.listen(3000, () => {
    console.log("Server is up and listening on port 3000")
})