import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import ViewAllMovies from "./components/searchMoviePage.component";
import ViewAllActors from "./components/searchActorPage.component";
import ViewTopMovies from "./components/viewTopMovies.component"

class App extends Component {
  render(){
    return(
      <Router>
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div class="navbar-nav">
                      <Link to="/" className="navbar-brand">Movie Galore</Link>
                      <Link to="/actors" className="nav-item nav-link">Actors</Link>
                      <Link to="/viewTopMovies" className="nav-item nav-link">Top Movies By Year</Link>
                  </div>
              </div>
          </nav>

            <Route path="/" exact component={ViewAllMovies} />
            <Route path="/actors"  component={ViewAllActors} />
            <Route path="/viewTopMovies" component={ViewTopMovies}/>
        </div>

         
      </Router>
    )
  }
}

export default App;
