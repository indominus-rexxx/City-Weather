import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCityList, deleteCity, updateCityList } from '../../redux/actions';
import CityStorage from '../../city-storage';
import Loader from '../loader';

import './styles.css';

const cityStorage = new CityStorage();

class Table extends Component {

    componentDidMount() {
        const { loadCityList, updateCityList } = this.props
        const data = cityStorage.getCityList()
        loadCityList(data)
        updateCityList(data)
    };

    componentDidUpdate() {
        const { city_list } = this.props
        localStorage.setItem('city_list', JSON.stringify(city_list))
    }

    componentWillUnmount() {
        // localStorage.clear()
    }
    
    render() {
        const { city_list, deleteCity } = this.props
        return (
            <div className='table-city'>
                <table className='table table-striped table-hover table-sm'>
                    <thead className='thead-dark'>
                        <tr>
                            {headers.map((header, idx) => <th key={idx}>{header}</th>)}
                            <th className='del-button'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {city_list.map((e, k) => e && e.data ? (
                            <tr key={k}>
                                <td>{e.city}</td>
                                <td>{e.data.weather ? 
                                    <span style={{color: 'rgb(55 122 141)', fontWeight: '500'}}>
                                        <img src={`http://openweathermap.org/img/wn/${e.data.icon}@2x.png`} width='50' height='50' alt=''/>
                                        <br/>
                                        {e.data.weather}
                                    </span> : <Loader/>}
                                </td>
                                <td>{e.data.temp ? e.data.temp : <Loader/>}</td>
                                <td>{e.data.wind ? e.data.wind : <Loader/>}</td>
                                <td>{e.data.pressure ? e.data.pressure : <Loader/>}</td>
                                <td>{e.data.humidity ? e.data.humidity : <Loader/>}</td>
                                <td className='del-button'>
                                    <button
                                    onClick={() => deleteCity(k)}
                                    className="btn btn-del"><i className="fa fa-trash"></i></button>
                                </td>
                            </tr>
                        ) : null)}
                    </tbody>
                </table>
            </div>
        );
    };
};

const headers = [ "City", "Weather", "Temperature, \u2103", "Wind", "Pressure", "Humidity" ];

const mapStateToProps = ({ city_list }) => {
    return { city_list }
};

const mapDispatchToProps = {
    loadCityList,
    deleteCity,
    updateCityList
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);