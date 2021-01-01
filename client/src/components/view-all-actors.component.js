import React, {Component} from 'react';
import axios from 'axios';

const Actor = props => (
    <tr>
        <td><a href={props.actor.url}>{props.actor.name}</a></td>
    </tr>
)

export default class ActorList extends Component{
    constructor(props){
        super(props);
        this.state = {actors: []};
    }

    componentDidMount(){
        axios.get('')
        .then(response => {
            this.setState({actors: response.data});
        }).catch(function(error){
            console.log(error);
        })
    }

    actorList(){
        return Object.keys(this.state.actors).map((k,i)=>{
            return <Actor actor={this.state.actors[k]} key={i} />
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
                        <tbody>
                            {this.actorList()}
                        </tbody>
                    </thead>
                </table>
            </div>
        )
    }
}