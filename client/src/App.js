import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import ViewAllMovies from "./components/view-all-movies.component";
import ViewAllActors from "./components/view-all-actors.component";

class App extends Component {
  render(){
    return(
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to="/" className="navbar-brand">Movie Galore</Link>
              <Link to="/actors" className="navbar-brand">Actors</Link>
            </nav>

            <Route path="/" exact component={ViewAllMovies} />
            <Route path="/actors" exact component={ViewAllActors} />
        </div>

         
      </Router>
    )
  }
}

export default App;
