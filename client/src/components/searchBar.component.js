import React from 'react'

const SearchBar = ({keyword, setKeyword, placeholder}) =>{
    
    return (
        <input 
        className="form-control col-sm-3"
        key=""
        value={keyword}
        placeholder={placeholder}
        onChange={(e) => setKeyword(e.target.value)}
        />
    )
}

export default SearchBar