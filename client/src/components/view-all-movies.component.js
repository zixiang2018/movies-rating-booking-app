import React, {Component} from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

const Movie = props => (
    <tr>
        <td><img src={props.movie.thumbnail_url}/></td>
        <td>{props.movie.title}</td>
        <td>{props.movie.movie_year}</td>
        <td>{props.movie.rating}</td>
        <td>{props.movie.num_of_ratings}</td>
        <td>{props.movie.actors.map((actor, i)=>
            <tr>{actor}</tr>
        )}</td>
    </tr>
)

export default class MovieList extends Component {

    constructor(props) {
        super(props);
        this.state = {movies: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/movies/')
            .then(response => {
                // console.log(response.data)
                this.setState({movies: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    movieList() {
        return Object.keys(this.state.movies).map((k, i) => {
            return <Movie movie={this.state.movies[k]} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>List of Movies</h3>
                <table className="table" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Banner</th>
                            <th>Title</th>
                            <th>Year</th>
                            <th>Rating</th>
                            <th>Number of Ratings</th>
                            <th>Actors</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.movieList() }
                    </tbody>
                </table>
            </div>
        )
    }
}