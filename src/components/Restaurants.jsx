import React, { Component } from 'react';

import { Consumer } from '../context';
import Restaurant from './Restaurant';

class Restaurants extends Component {
    render() {
        return (
            <Consumer>
                {value => {
                    const { restaurant_list, heading } = value;
                    return (
                        <React.Fragment>
                        <h3 className="text-center mb-4">{heading}</h3>
                        <div className="row">
                            {restaurant_list.map(item => (
                                <Restaurant key={item.id} restaurant={item} />
                            ))}
                        </div>
                        </React.Fragment>
                    );
                }}
            </Consumer>
        );
    }
}

export default Restaurants;