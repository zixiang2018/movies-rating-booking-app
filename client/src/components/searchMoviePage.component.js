import axios from 'axios';
import React, {useState, useEffect} from 'react';
import MovieTable from "./movieTable.component"
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
            <h3 className="h3">Search Movies</h3>
            <div className="form-group row">
                <SearchBar placeholder="E.g. 'Wonder Woman 1984'" keyword={input} setKeyword={updateInput}/>
                <MovieTable movieList={movieList}/>
            </div>
        </div>
    )
    
}

export default SearchMoviePage