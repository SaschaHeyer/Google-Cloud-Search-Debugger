import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import packageJson from "../package.json";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Index from "./components/index";

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to={"/"} className="navbar-brand">
            URL Validator <small>{packageJson.version} </small>
            <small className="pl-2">Made with ❤ in Berlin</small>
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {/** * <li className="nav-item">
                <Link to={'/index'} className="nav-link">Manage</Link>
              </li>
              <li className="nav-item">
                <Link to={'/create'} className="nav-link">Create</Link>
              </li>*/}
            </ul>
          </div>
        </nav>{" "}
        <br />
        <Switch>
          <Route path="/" component={Index} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
