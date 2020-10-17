import React, { Component } from 'react';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';

import './styles.css';

class Geolocation extends Component {

    state = {
        lat: null,
        lon: null
    }

    componentDidMount() {
        this.getLocation()
    };

    componentDidUpdate(prevProps, prevState) {
        this.getLocation()
        const { lat, lon } = this.state
        if ((lat && lon) && (prevState.lat !== lat || prevState.lon !== lon)) {
            this.props.loadCurrentCity(lat, lon)
        }
    }

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates)
        }
    }

    getCoordinates = (position) => {
        this.setState({
            lat: Math.round(parseFloat(position.coords.latitude) * 100) / 100,
            lon: Math.round(parseFloat(position.coords.longitude) * 100) / 100
        })
    }

    render() {
    const { city_list, current_city, addCity } = this.props;
    const { lat, lon } = this.state;
        return (
            <div className='city-form'>
                {current_city ?
                    <div>
                        <ul className="list-group list-group-flush">
                            <h3>Your City:</h3>
                            {Object.entries({...current_city, lat, lon}).map(([key, value]) => {
                                if (typeof value === "object") {
                                    const { icon, ...rest } = value;
                                    return Object.keys(rest).map((key) => {
                                        return <li key={key} className="list-group-item list-group-item-action list-group-item-light">{`${key}: ${value[key]}`}</li>
                                    })
                                }
                                return (
                                    key === "city" ? <li key={key} className="list-group-item list-group-item-action list-group-item-light">{value}</li>
                                    :
                                    <li key={key} className="list-group-item list-group-item-action list-group-item-light">{`${key}: ${value}`}</li>
                                )
                            })}
                        </ul>
                        <button className="btn btn-secondary add-cur-city-btn"
                         onClick={() => addCity([...city_list, current_city])}>Add your city into list</button>
                    </div>
                : null}
            </div>
        )
    };
};

const mapStateToProps = ({ city_list, current_city }) => {
    return { city_list, current_city }
};


export default connect(mapStateToProps, actions)(Geolocation);