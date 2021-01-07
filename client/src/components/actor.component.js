import React,{useState, useEffect} from 'react';
import axios from 'axios'


const Actor = ({name})=>{
    const [url, setUrl] = useState("")

    const fetchData = async() =>{
        return await axios.get('/api/actors/' + name)
            .then(res => {
                setUrl(res.data[0].url)
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    useEffect(() => {fetchData()},[])

    return (
        <a  target="_blank" href={url}> {name}</a>
    )
    
}

export default Actor
