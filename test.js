
let app = require("./app.js")
let chai = require("chai")
let chaiHttp = require("chai-http")
// let db = require("mongoose")
const { response } = require("express")


const db = require("./src/models")
const Movie = db.movies
const Actor = db.actors

// Assertion
const expect = chai.expect
chai.use(chaiHttp)
chai.use(require('chai-json'))

let movie



describe("Movies", () => {

    beforeEach ((done)=>{
        for(var i = 1 ;i <= 5 ;i++){
            movie = Movie.create({
                title: "testTitle"+i.toString(),
                movie_year: "200"+i.toString(),
                rating: parseInt(i),
                num_of_ratings: 20000,
                thumbnail_url: "https://www.google.com",
                actors: ["testActor1","testActor2","testActor3"]
            })
        }
        done()        
    })

    /*
    * Test the GET /api/movies/ route
    */
   describe ("/GET /api/movies/",()=>{
        it("It should return all movies", (done) => {
            chai.request(app)
                .get("/api/movies")
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.a('Object')
                    var expected = {
                        0: {
                        actors: [ 'testActor1', 'testActor2', 'testActor3' ],
                        title: 'testTitle1',
                        movie_year: "2001",
                        rating: 1,
                        num_of_ratings: 20000,
                        thumbnail_url: 'https://www.google.com',
                        },
                        1: {
                        actors: [ 'testActor1', 'testActor2', 'testActor3' ],
                        title: 'testTitle2',
                        movie_year: "2002",
                        rating: 2,
                        num_of_ratings: 20000,
                        thumbnail_url: 'https://www.google.com',
                        },
                        2: {
                        actors: [ 'testActor1', 'testActor2', 'testActor3' ],
                        title: 'testTitle3',
                        movie_year: "2003",
                        rating: 3,
                        num_of_ratings: 20000,
                        thumbnail_url: 'https://www.google.com',
                        },
                        3: {
                        actors: [ 'testActor1', 'testActor2', 'testActor3' ],
                        title: 'testTitle4',
                        movie_year: "2004",
                        rating: 4,
                        num_of_ratings: 20000,
                        thumbnail_url: 'https://www.google.com',
                        },
                        4: {
                        actors: [ 'testActor1', 'testActor2', 'testActor3' ],
                        title: 'testTitle5',
                        movie_year: "2005",
                        rating: 5,
                        num_of_ratings: 20000,
                        thumbnail_url: 'https://www.google.com',
                        }
                    }
                    let i = 0
                    for (const [key, value] of Object.entries(res.body)){
                        expect(value.actors).to.be.eql(expected[i].actors)
                        expect(value.movie_year).to.be.eql(expected[i].movie_year)
                        expect(value.title).to.be.eql(expected[i].title)
                        expect(value.rating).to.be.eql(expected[i].rating)
                        expect(value.num_of_ratings).to.be.eql(expected[i].num_of_ratings)
                        expect(value.thumbnail_url).to.be.eql(expected[i++].thumbnail_url)
                    }
                    done()
                })
        })
   })
    

    /*
    * Test the GET /api/movies/:title route
    */
   describe("/GET /api/movies/:title",()=>{
        it("It should return one movie", (done) => {
            chai.request(app)
                .get("/api/movies/testTitle1")
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.a('array')
                    var expected = {
                        0: {
                        actors: [ 'testActor1', 'testActor2', 'testActor3' ],
                        title: 'testTitle1',
                        movie_year: "2001",
                        rating: 1,
                        num_of_ratings: 20000,
                        thumbnail_url: 'https://www.google.com'
                        }
                    }
                    let i = 0
                    for (const [key, value] of Object.entries(res.body)){
                        expect(value.actors).to.be.eql(expected[i].actors)    
                        expect(value.movie_year).to.be.eql(expected[i].movie_year)
                        expect(value.title).to.be.eql(expected[i].title)
                        expect(value.rating).to.be.eql(expected[i].rating)
                        expect(value.num_of_ratings).to.be.eql(expected[i].num_of_ratings)
                        expect(value.thumbnail_url).to.be.eql(expected[i].thumbnail_url)
                    }
                    done()
                })
        })
   })
    

   /*
    * Test the GET /api/movies/findMoviesByYear/:movie_year route
    */
   describe("/GET /api/movies/findMoviesByYear/:movie_year",()=>{
    it("It should return movies from the given input year", (done) => {
        chai.request(app)
            .get("/api/movies/findMoviesByYear/2003")
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('array')
                var expected = {
                    0: {
                    actors: [ 'testActor1', 'testActor2', 'testActor3' ],
                    title: 'testTitle3',
                    movie_year: "2003",
                    rating: 3,
                    num_of_ratings: 20000,
                    thumbnail_url: 'https://www.google.com',
                    id: '2'
                    }
                }
                let i = 0
                for (const [key, value] of Object.entries(res.body)){
                    expect(value.actors).to.be.eql(expected[i].actors)    
                    expect(value.movie_year).to.be.eql(expected[i].movie_year)
                    expect(value.title).to.be.eql(expected[i].title)
                    expect(value.rating).to.be.eql(expected[i].rating)
                    expect(value.num_of_ratings).to.be.eql(expected[i].num_of_ratings)
                    expect(value.thumbnail_url).to.be.eql(expected[i].thumbnail_url)
                }
                done()
            })
    })
})

    afterEach( (done) => {
         Movie.remove({}).then(() => done())
      })
})



describe("Actors", () => {

    beforeEach ((done)=>{
        for(var i = 1 ;i <= 3 ;i++){
            actor = Actor.create({
                name: "testActor" + i.toString(),
                url: "testexampleurl.com/"+i.toString()
            })
        }
        done()
    })

    /*
    * Test the GET /GET /api/actors/ route
    */
    describe("/GET /api/actors",()=>{
        it("Find all actors",(done)=>{
            chai.request(app)
                .get("/api/actors/")
                .end((err,res) =>{
                    expect(res).to.have.status(200)
                    var expected = {
                        0: {
                            name: "testActor1",
                            url: "testexampleurl.com/1",
                        },
                        1: {
                            name: "testActor2",
                            url: "testexampleurl.com/2",
                        },
                        2: {
                            name: "testActor3",
                            url: "testexampleurl.com/3",
                        }
                    }

                    let i = 0
                    for (const[key,value] of Object.entries(res.body)){
                        expect(value.name).to.be.eql(expected[i].name)
                        expect(value.url).to.be.eql(expected[i++].url)
                    }
                    done()
                })
        })
    })
 
    /*
    * Test the GET /GET /api/actors/:name route
    */
    describe("/GET /api/actors/:name", (done)=>{
        it("Find one actor",(done)=>{
            chai.request(app)
                .get("/api/actors/testActor1")
                .end((err,res) => {
                    var expected = {
                        0: {
                            "name": "testActor1",
                            "url": "testexampleurl.com/1"
                        }
                    }
                    let i = 0
                    for(const[key,value] of Object.entries(res.body)){
                        expect(value.name).to.be.eql(expected[i].name)
                        expect(value.url).to.be.eql(expected[i].url)
                    }
                    done()
                })
        })
    })

    afterEach((done) => {
         Actor.remove({}).then(() => done())
    })
})