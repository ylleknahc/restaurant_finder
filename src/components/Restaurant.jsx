import React from 'react';
import { Link } from 'react-router-dom';

const Restaurant = (props) => {
    const { restaurant } = props;

    const renderRatingStars = () => {
        let classes = "fa-star";

    }

    return (
        <div className="col-md-6">
        <div className="card mb-4 shadow-sm">
            <div className="card-body">
                <h5><Link to={`restaurants/${restaurant.id}`}>{restaurant.name}</Link></h5>
                <p className="card-text">
                    <strong><i className="fas fa-angle-double-right" style={{color:"#D22323"}}></i> Rating</strong>: {restaurant.rating}
                    {/* <i class="fas fa-star  far fa-star"></i> */}
                    <br/>
                    <strong><i className="fas fa-angle-double-right" style={{color:"#D22323"}}></i> Price</strong>: {restaurant.price}
                    <br/>
                    <strong><i className="fas fa-angle-double-right" style={{color:"#D22323"}}></i> Reviews</strong>: {restaurant.review_count}
                </p>
            </div>
        </div>
        </div>
    );
}

export default Restaurant;