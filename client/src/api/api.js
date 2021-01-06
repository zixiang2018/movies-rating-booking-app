import axios from 'axios'

export function getOneActor(actorName) {
    return axios.get('http://localhost:5000/api/actors/'+actorName)
    .then(res => res.data)
    .catch(function (error) {
        console.log(error)
    })
}

export function getActorsByName(actorName) {
    return axios.get('http://localhost:5000/api/actors/getActorsByName/'+actorName)
    .then(res => res.data)
    .catch(function (error) {
        console.log(error)
    })
}


export function getAllActors() {
    return axios.get('http://localhost:5000/api/actors/')
    .then(res => res.data)
    .catch(function (error) {
        console.log(error)
    })
}


export function getMoviesByTitle(movieTitle) {
    return axios.get('http://localhost:5000/api/movies/getMoviesByTitle/'+movieTitle)
    .then(res => res.data)
    .catch(function (error) {
        console.log(error)
    })
}

export function getOneMovie(movieTitle) {
    return axios.get('http://localhost:5000/api/movies/'+movieTitle)
    .then(res => res.data)
    .catch(function (error) {
        console.log(error)
    })
}


export function getAllMovies() {
    return axios.get('http://localhost:5000/api/movies/')
    .then(res => res.data)
    .catch(function (error) {
        console.log(error)  
    })
}


