import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class RestaurantDetail extends Component {
    state = {
        restaurant: {}
    }

    componentDidMount() {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${this.props.match.params.id}`,
            { headers: { Authorization: `Bearer ${process.env.REACT_APP_YELP_API}`} })
            .then(res => {
                console.log(res.data);
                this.setState({ restaurant: res.data })
            })
            .catch(err => console.log(err));
    }

    render() {
        const { restaurant } = this.state;
        console.log(restaurant.photos);
        let photos = [];
        photos = restaurant.photos;
        console.log("hi", photos);
        for (let p in restaurant.photos) {
            console.log(restaurant.photos[p]);
        }
        // photos.map(p => console.log(p));
        return (
            <React.Fragment>
                <Link to="/" className="btn btn-danger btn-sm mb-4" style={{backgroundColor:"#D22323"}}>Go Back</Link>
                <div className="card">
                    <h5 className="card-header">
                        {restaurant.name}
                    </h5>
                    <div className="card-body">
                        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    {/* {photos.map(p =>
                                        <img src={} alt="" className="d-block w-100"/>
                                    )} */}
                                </div>
                                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="list-group mt-3">
                    <li className="list-group-item"></li>
                </ul>
            </React.Fragment>
        );
    }
}

export default RestaurantDetail;