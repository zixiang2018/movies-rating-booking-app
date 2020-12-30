import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import ViewAllMovies from "./components/view-all-movies.component";

class App extends Component {
  render(){
    return(
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to="/" className="navbar-brand">Movie Galore</Link>
            </nav>

            <Route path="/" exact component={ViewAllMovies} />
        </div>

         
      </Router>
    )
  }
}

export default App;
