import React from 'react';
import Actor from './actor.component'


const ActorList = ({actors={}}) =>{
    console.log(actors)
    return (
        Object.keys(actors).map((k,i)=>{
            return <tr>
                    <td actor={actors[k]} key={i}>
                        <Actor name={actors[k].name} />
                    </td>
                </tr>
        })
    )
}


export default ActorList
