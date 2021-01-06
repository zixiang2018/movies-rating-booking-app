import React, { Component } from 'react'
import Actor from './actor.component'


const MovieList = ({movieList={}})=> {
    
    return(
        Object.keys(movieList).map((k,index)=>{
            if (k){
                var movie = movieList[k]
                // console.log(movie)
                return (
                    <tr key={index}>
                        <td><img src={movie.thumbnail_url}/></td>
                        <td>{movie.title}</td>
                        <td>{movie.movie_year}</td>
                        <td>{movie.rating}</td>
                        <td>{movie.num_of_ratings}</td>
                        <td>
                            <ul className="list-group list-group-flush">
                                {movie.actors && movie.actors.map((actor, i)=>
                                    <li className="list-group-item" key ={i}>
                                        <Actor name={actor} />
                                    </li>
                                )}
                            </ul>
                        </td>
                        <td><a target="_blank" href={"https://www.imdb.com/find?q=" +movie.title } className="btn btn-primary">Book</a></td>
                    </tr>
                )   
            }
            // console.log("Returning null")
            return null
        })
    )
}

export default MovieList