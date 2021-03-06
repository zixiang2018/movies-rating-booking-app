import axios from 'axios';
import React, {useState, useEffect} from 'react';
import MovieTable from "./movieTable.component"


const SearchMoviePage = (props) => {
    const [input, setInput] = useState('')
    const [movieListDefault, setMovieListDefault] = useState()
    const [movieList, setMovieList] = useState()
    const [yearList, setYearList] = useState()

    const baseURL = window.location.origin


    const fetchData = async() =>{
        return await axios.get(baseURL+"/api/movies/")
            .then(res => {
                setMovieListDefault(res.data)
                setMovieList(res.data);
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    const fetchYearData = async() =>{
        return await axios.get(baseURL+'/api/movies/getYears')
            .then(res => {
                setYearList(res.data)
            })
            .catch((error)=>{
                console.log(error)
            })
    }


    const sortMoviesByRating = (movieList) =>{
        if(movieList) {
            var movieIdAndRating = []
            var result = []
    
            for (const [key,value] of Object.entries(movieList)){
                movieIdAndRating.push([key,value.rating])
            }
    
            movieIdAndRating.sort((a,b)=>{
                return b[1] - a[1]
            })
    
            for (var movie of movieIdAndRating){
                result.push(movieList[movie[0]])
            }

            //console.log(result)

            return result
        }
        
    }


    const updateInput = (input) =>{
        console.log(movieListDefault)
        if (input === "all"){
            setInput(input)
            setMovieList(sortMoviesByRating(movieListDefault))
        }
        else{
            const filtered = Object.values(movieListDefault)
            .filter(movie =>{
                return movie.movie_year.includes(input.toLowerCase())
            })
            console.log(filtered)
            setInput(input)
            setMovieList(sortMoviesByRating(filtered))
        }
        
    }

    useEffect(() => {fetchData()},[])
    useEffect(()=> {fetchYearData()}, [])
    

    return (
        <div className='container-fluid my-3'>
            <h3>Search Movie by Year</h3>
            <div className="row">
                <select className="form-control col-sm-3" id="exampleFormControlSelect1" onChange={(e) => updateInput(e.target.value)}>
                    <option value="" disabled selected>Select a year</option>
                    <option value="all">All</option>
                    {yearList && yearList.map(year=> {
                        return <option value={year}>{year}</option>
                    })}
                </select>
            </div>
            
                
            <MovieTable movieList={movieList}/>

        </div>
    )
    
}

export default SearchMoviePage