import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

import MapContainer from './MapContainer';
import Spinner from './Spinner';

class RestaurantDetail extends Component {
    state = {
        restaurant: {}
    }

    // componentDidMount() {
    //     axios.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${this.props.match.params.id}`,
    //         { headers: { Authorization: `Bearer ${process.env.REACT_APP_YELP_API}`} })
    //         .then(res => {
    //             console.log("logging res.data", res.data);
    //             this.setState({ restaurant: res.data })
    //         })
    //         .catch(err => console.log(err));
    // }
    async componentDidMount() {
        const { data: restaurant } = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${this.props.match.params.id}`,
            { headers: { Authorization: `Bearer ${process.env.REACT_APP_YELP_API}`} })
        this.setState({ restaurant: restaurant })
    }

    render() {
        const { restaurant } = this.state;
        // let photos = [];
        // photos = restaurant.photos;
        // console.log("photos", photos);
        // for (let p in restaurant.photos) {
        //     console.log("for loop", restaurant.photos[p]);
        // }
        if (restaurant.photos == undefined || Object.keys(restaurant.photos).length == 0) {
            return <Spinner />
        } else {
            // console.log(restaurant);
            // restaurant.hours.map(h => {

            //     console.log(h.is_open_now);
            // })
            // console.log("testing", restaurant.hours[0].is_open_now)
            // console.log(restaurant.photos);
            // restaurant.photos.map(p => console.log("photos map", p));
            return (
                <React.Fragment>
                    <Link to="/" className="btn btn-dangew2r btn-sm mb-4" style={{color:"#FFFFFF",backgroundColor:"#D22323",textDecoration:'none'}}>Go Back</Link>
                    <div className="card">
                        <h5 className="card-header">
                           {restaurant.name}&nbsp;&nbsp;
                            <StarRatings
                                rating={restaurant.rating}
                                starRatedColor="#D32323"
                                numberOfStars={5}
                                name="rating"
                                starDimension="1rem"
                                starSpacing="0.1rem"
                            />
                        </h5>
                        <div className="card-body">
                            <Carousel>
                                {restaurant.photos.map(photo =>
                                <Carousel.Item key={photo}>
                                     <img id="food-img" src={photo} alt="food image" className="d-block w-100"/>
                                </Carousel.Item>
                                )}
                            </Carousel>
                        </div>
                    </div>
                    <ul className="list-group mt-3 mb-3">
                        <li className="list-group-item">
                            <strong>Price</strong>:
                            <div className="ml-2">
                                {restaurant.price}
                                {/* <StarRatings
                                    rating={restaurant.rating}
                                    starRatedColor="#D32323"
                                    numberOfStars={5}
                                    name="rating"
                                    starDimension="1rem"
                                    starSpacing="0.1rem"
                                /> */}
                            </div>
                            <strong>Location</strong>:
                            <div className="ml-2">
                                {restaurant.location.display_address[0]}
                                <br/>
                                {restaurant.location.display_address[1]}
                            </div>
                            <strong>Phone</strong>:
                            <div className="ml-2">
                                {restaurant.display_phone}
                            </div>
                            <strong>Open Now?</strong>
                            <div className="ml-2">
                                {restaurant.hours[0].is_open_now ? "Yes": "No"}
                            </div>
                        </li>
                    </ul>
                    <MapContainer coordinates={restaurant.coordinates}/>
                </React.Fragment>
            );
        }
    }
}

export default RestaurantDetail;