import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import ViewAllMovies from "./components/searchMoviePage.component";
import ViewAllActors from "./components/searchActorPage.component";

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
            <Route path="/actors"  component={ViewAllActors} />
        </div>

         
      </Router>
    )
  }
}

export default App;
