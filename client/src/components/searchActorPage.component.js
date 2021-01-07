import axios from 'axios';
import React, {useState, useEffect} from 'react';
import ActorList from './actorList.component';
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
        <div className='my-3'>
            <h3>List of Actors</h3>
            <SearchBar placeholder="Search Actors" keyword={input} setKeyword={updateInput}/>   
            <table className="table table-striped" style={{ marginTop: 20}}>
                <thead>
                    <tr>
                        <th>Actor Names</th>
                    </tr>
                </thead>
                <tbody>
                        <ActorList actors={actorList}/>
                </tbody>
            </table>
        </div>
        
    )
    
}

export default SearchActorPage