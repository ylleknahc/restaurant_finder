import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../context';

class Location extends Component {
    state = {
        location: ""
    }

    onChange = (event) => {
        return this.setState({ [event.target.name]: event.target.value });
    }

    findRestaurants = (dispatch, event) => {
        event.preventDefault();
        console.log("in findRestaurants");
        axios
            .get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search`,
                { headers: { Authorization: `Bearer ${process.env.REACT_APP_YELP_API}`},
                    params: { location: this.state.location, term: "restaurants", limit: 20, sort_by: "review_count" } })
            .then(res => {
                dispatch({
                    payload: res.data.businesses
                })
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }

    render() {
        console.log(this.state.location);
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card card-body mb-4 p-4">
                            <h1 className="display-4 text-center">
                                <i className="fas fa-map-marker-alt" style={{color: "#5C87C5"}}></i> Enter a location
                            </h1>
                            <p className="lead text-center">Get the top 20 restaurants in the area</p>
                            <form onSubmit={this.findRestaurants.bind(this, dispatch)}>
                                <div className="form-group">
                                    <input onChange={this.onChange} type="text" className="form-control form-control-lg" placeholder="Enter a city..." name="location" value={this.state.location}/>
                                </div>
                                <button className="btn btn-dark btn-lg btn-block mb-5">Search</button>
                            </form>
                        </div>
                    );
                }}
            </Consumer>
        );
    }
}

export default Location;