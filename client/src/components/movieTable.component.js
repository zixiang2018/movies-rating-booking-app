import React, {useState, useEffect} from 'react';
// import MovieList from "./movieList.component"
import Actor from './actor.component'
import DataTable from 'react-data-table-component';


const MoviePage = ({movieList=[]}) => {
    const columns = [
        {
          name: 'Banner',
          cell: row => <img src={row.thumbnail_url}/>
        },
        {
            name: 'Title',
            sortable: true,
            selector: row => row.title
        },
        {
            name: 'Year',
            sortable: true,
            selector: row => row.movie_year
        },
        {
            name: 'rating',
            sortable: true,
            selector: row => row.rating
        },
        {
            name: 'Number of Ratings',
            sortable: true,
            selector: row => row.num_of_ratings
        },
        {
            name: 'Actors',
            cell: row => <ul className="list-group list-group-flush">
                        {row.actors && row.actors.map((actor, i)=>
                            <li className="list-group-item" key ={i}>
                                <Actor name={actor} />
                            </li>
                        )}
                    </ul>,
        },
        {
            name: 'Make Booking',
            cell: row => <a target="_blank" href={"https://www.imdb.com/find?q=" +row.title } className="btn btn-primary">Book</a>
        },

      ];


    return (
        <DataTable
            columns={columns}
            data ={[...Object.values(movieList)]}
            noHeader
            pagination
        />
    )

    
}

export default MoviePage