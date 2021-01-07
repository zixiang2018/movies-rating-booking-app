import axios from 'axios';
import React, {useState, useEffect} from 'react';
import ActorList from './actorTable.component';
import SearchBar from "./searchBar.component"


const SearchActorPage = (props) => {
    const [input, setInput] = useState('')
    const [actorListDefault, setActorListDefault] = useState()
    const [actorList, setActorList] = useState()

    const fetchData = async() =>{
        return await axios.get('http://localhost:5000/api/actors/')
            .then(res => {
                setActorListDefault(res.data)
                setActorList(res.data)
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    const updateInput = (input) =>{
        const filtered = Object.values(actorListDefault).filter(actor =>{
            return actor.name.toLowerCase().includes(input.toLowerCase())
        })
        setInput(input)
        setActorList(filtered)
    }

    useEffect(() => {fetchData()},[])

    return (
        <div className='container-fluid my-3'>
            <h3 className="h3">Search Actors</h3>
            <div className="form-group row">
                <SearchBar placeholder="E.g. 'Gal Gadot'" keyword={input} setKeyword={updateInput}/>   
                <ActorList actors={actorList}/>
            </div>
        </div>
        
    )
    
}

export default SearchActorPage