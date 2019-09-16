import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "./context";
import Index from "./components/Index";
import NavBar from "./components/NavBar";
import RestaurantDetail from "./components/RestaurantDetail";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <React.Fragment>
            <NavBar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Index} />
                <Route
                  exact
                  path="/restaurants/:id"
                  component={RestaurantDetail}
                />
              </Switch>
            </div>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
