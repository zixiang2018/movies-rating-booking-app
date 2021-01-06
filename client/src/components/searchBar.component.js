import React, {Component} from 'react'

const SearchBar = ({keyword, setKeyword, placeholder}) =>{
    
    return (
        <input 
        className="form-control"
        key=""
        value={keyword}
        placeholder={placeholder}
        onChange={(e) => setKeyword(e.target.value)}
        />
    )
}

export default SearchBar