import React from 'react';
import Actor from './actor.component'
import DataTable from 'react-data-table-component'

const ActorList = ({actors={}}) =>{
    // console.log(actors)
    const columns = [
        {
            name: 'Actor Name',
            cell: row => <Actor name={row.name} />
        }
    ]
    return (
        <DataTable
            columns={columns}
            data={[...Object.values(actors)]}
            noHeader
            pagination
            highlightOnHover
        />
    )
}


export default ActorList
