import React, { useState, useEffect } from 'react';
import { addCity, updateCityList } from '../../redux/actions';
import { connect } from 'react-redux';

import './styles.css';

const AddPanel = ({ addCity, city_list, updateCityList }) => {

    const [city, setCity] = useState('');
    const [submited, setState] = useState(false);

    const handleSubmit = event => {
        event.preventDefault()
        addCity([...city_list, {
            city: city,
            data: {}
        }])
        setState(true)
        setCity('')
    };

    const addNewCity = (event) => {
        setCity(event.target.value)
    };

    useEffect(() => {
        if (submited) {
            updateCityList(city_list)
        }
        setState(false)
    }, [submited, updateCityList, city_list])
    
    return (
        <div>
            <form onSubmit={handleSubmit} className="form-row mb-2">
                <input className='form-control'
                       placeholder='Enter City'
                       onChange={addNewCity}
                       value={city}/>
                <button type="submit" className="btn btn-secondary mb-2">Add City</button>
            </form>
        </div>
    );
};

const mapStateToProps = ({ city_list }) => {
    return { city_list }
};

const mapDispatchToProps = {
    addCity,
    updateCityList
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPanel);