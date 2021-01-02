import React, {Component} from 'react';
import axios from 'axios';

export default class Actor extends Component{
    constructor(props){
        super(props);
        this.state = {name:this.props.name, url:this.props.url};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/actors/'+this.state.name)
            .then(response => {
                // console.log(response.data)
                this.setState({
                    name: response.data[0].name, 
                    url: response.data[0].url
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render(){
        return (
            <a href={this.state.url}> { this.state.name}</a>
        )
    }
    

}
