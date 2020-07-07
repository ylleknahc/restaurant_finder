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
                    payload: res.data.businesses,
                    header: "Top 20 Restaurants in the Area"
                })
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }

    chooseRandomRestaurant = (dispatch, event) => {
        console.log("in chooserandom");
        event.preventDefault();
        axios
            .get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search`,
                { headers: { Authorization: `Bearer ${process.env.REACT_APP_YELP_API}`},
                    params: { location: this.state.location, term: "restaurants", limit: 50, sort_by: "best_match" } })
            .then(res => {
                const randNum = Math.floor(Math.random()*51);
                console.log(res.data.businesses[randNum]);
                dispatch({
                    payload: [res.data.businesses[randNum]],
                    header: "Popular Pick by Yelp users"
                })
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
                            <p className="lead text-center">Get the top 20 restaurants in the area or let us help you choose a favorite</p>
                            <form>
                                <div className="form-group">
                                    <input onChange={this.onChange} type="text" className="form-control form-control-lg" placeholder="Enter a city..." name="location" value={this.state.location}/>
                                </div>
                                <button onClick={this.findRestaurants.bind(this, dispatch)} className="btn btn-dark btn-lg btn-block mb-1">Search</button>
                                <button onClick={this.chooseRandomRestaurant.bind(this, dispatch)} style={{backgroundColor:"#D22323"}} className="btn btn-danger btn-lg btn-block mb-5">Pick a Random Restaurant</button>
                            </form>
                        </div>
                    );
                }}
            </Consumer>
        );
    }
}

export default Location;