import axios from 'axios';
import React, {useState, useEffect} from 'react';
import MovieList from "./movieList.component"
import SearchBar from "./searchBar.component"


const SearchMoviePage = (props) => {
    const [input, setInput] = useState('')
    const [movieListDefault, setMovieListDefault] = useState()
    const [movieList, setMovieList] = useState()

    const fetchData = async() =>{
        return await axios.get('http://localhost:5000/api/movies/')
            .then(res => {
                setMovieListDefault(res.data)
                setMovieList(res.data);
            })
            .catch((error)=>{
                console.log(error)
            })
    }


    const updateInput = (input) =>{
        const filtered = Object.values(movieListDefault)
        .filter(movie =>{
            return movie.title.toLowerCase().includes(input.toLowerCase())
        })
        // console.log(filtered)
        setInput(input)
        setMovieList(filtered)
    }

    useEffect(() => {fetchData()},[])

    return (
        <div className=' container-fluid my-3'>
            <h3 class="h3">Search Movies</h3>
            <div className="form-group row">
                <SearchBar placeholder="E.g. 'Wonder Woman 1984'" keyword={input} setKeyword={updateInput}/>
            </div>
            
                
            <table className="table" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Banner</th>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Rating</th>
                        <th>Number of Ratings</th>
                        <th>Actors</th>
                        <th>Make Booking</th>
                    </tr>
                </thead>
                <tbody>
                    <MovieList movieList={movieList}/>
                </tbody>
            </table>
        </div>
    )
    
}

export default SearchMoviePage