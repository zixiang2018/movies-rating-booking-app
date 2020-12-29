
let app = require("./app.js")
let chai = require("chai")
let chaiHttp = require("chai-http")
// let db = require("mongoose")
const { response } = require("express")


const db = require("./src/models");
const Movie = db.movies;

// Assertion
const expect = chai.expect
chai.use(chaiHttp)
chai.use(require('chai-json'));

let movie;



describe("GET /api/movies", () => {

    before ((done)=>{
        for(var i = 1; i <= 5; i++){
            movie = Movie.create({
                title: "testTitle"+i.toString(),
                rating: i.toString() + " based on 200,000 user ratings",
                thumbnail_url: "https://www.google.com",
                actors: ["testActor1","testActor2","testActor3"]
            })
        }
        done()        
    })


    it("It should return all movies", (done) => {
        chai.request(app)
            .get("/api/movies")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('Object')
                var expected = {
                    1: {
                      actors: [ 'testActor1', 'testActor2', 'testActor3' ],
                      title: 'testTitle1',
                      rating: '1 based on 200,000 user ratings',
                      thumbnail_url: 'https://www.google.com',
                      id: '1'
                    },
                    2: {
                      actors: [ 'testActor1', 'testActor2', 'testActor3' ],
                      title: 'testTitle2',
                      rating: '2 based on 200,000 user ratings',
                      thumbnail_url: 'https://www.google.com',
                      id: '2'
                    },
                    3: {
                      actors: [ 'testActor1', 'testActor2', 'testActor3' ],
                      title: 'testTitle3',
                      rating: '3 based on 200,000 user ratings',
                      thumbnail_url: 'https://www.google.com',
                      id: '3'
                    },
                    4: {
                      actors: [ 'testActor1', 'testActor2', 'testActor3' ],
                      title: 'testTitle4',
                      rating: '4 based on 200,000 user ratings',
                      thumbnail_url: 'https://www.google.com',
                      id: '4'
                    },
                    5: {
                      actors: [ 'testActor1', 'testActor2', 'testActor3' ],
                      title: 'testTitle5',
                      rating: '5 based on 200,000 user ratings',
                      thumbnail_url: 'https://www.google.com',
                      id: '5'
                    }
                }
                  let i = 1
                  for (const [key, value] of Object.entries(res.body)){
                    expect(value.actors).to.be.eql(expected[i].actors)
                    expect(value.title).to.be.eql(expected[i].title)
                    expect(value.rating).to.be.eql(expected[i].rating)
                    expect(value.thumbnail_url).to.be.eql(expected[i++].thumbnail_url)

                  }
                
                done()
            })
    })

    it("It should return all movies", (done) => {
        chai.request(app)
            .get("/api/movies/testTitle1")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array')
                var expected = {
                    1: {
                      actors: [ 'testActor1', 'testActor2', 'testActor3' ],
                      title: 'testTitle1',
                      rating: '1 based on 200,000 user ratings',
                      thumbnail_url: 'https://www.google.com',
                      id: '1'
                    }
                }
                  let i = 1
                  for (const [key, value] of Object.entries(res.body)){
                    expect(value.actors).to.be.eql(expected[i].actors)
                    expect(value.title).to.be.eql(expected[i].title)
                    expect(value.rating).to.be.eql(expected[i].rating)
                    expect(value.thumbnail_url).to.be.eql(expected[i++].thumbnail_url)
                  }
                
                done()
            })
    })

    after( (done) => {
         Movie.remove({}).then(() => done())
      })
})



