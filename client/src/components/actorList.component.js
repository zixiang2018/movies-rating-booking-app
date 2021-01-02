import React, {Component} from 'react';
import axios from 'axios';
import Actor from "./actor.component"


export default class ActorList extends Component{
    constructor(props){
        super(props);
        this.state = {actors: []};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/actors/')
        .then(response => {
            var actors = response.data
            this.setState({actors: response.data});
        }).catch(function(error){
            console.log(error);
        })
    }

    actorList(){
        return Object.keys(this.state.actors).map((k,i)=>{
            return <tr>
                    <td actor={this.state.actors[k]} key={i}>
                        <Actor name={this.state.actors[k].name} 
                        url={this.state.actors[k].url}/>
                    </td>
                </tr>
        });
    }

    render(){
        return (
            <div>
                <h3>List of Actors</h3>
                <table className="table table-striped" style={{ marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Actor Names</th>
                        </tr>
                    </thead>
                    <tbody>
                            { this.actorList() }
                        </tbody>
                </table>
            </div>
        )
    }
}