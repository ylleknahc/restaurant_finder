import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
  return {
    ...state,
    restaurant_list: action.payload,
    heading: action.header
  };
};

export class Provider extends Component {
  state = {
    restaurant_list: [],
    heading: "",
    dispatch: action => this.setState(state => reducer(state, action))
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
