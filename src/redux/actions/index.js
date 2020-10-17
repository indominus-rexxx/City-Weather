import * as actionTypes from '../action-types';
import axios from 'axios';

const keys = [
    '4944bfad4b0a94e1ffee8e4e398dbcb6',
    'd7bb304f1e58b88ab7ee9edb1014a67b',
    '27e8a57b98b3c19e5ab1b20afa4d0e0d',
]

let API_KEY = keys[0];

export const addCity = value => {
    return {
        type: actionTypes.ADD_CITY,
        payload: value
    };
};

export const loadCityList = value => {
    return {
        type: actionTypes.LOAD_CITY_LIST,
        payload: value
    };
};

export const deleteCity = id => {
    return {
        type: actionTypes.DELETE_CITY,
        payload: id
    };
};

export const getCurrentCity = value => {
    return {
        type: actionTypes.GET_CURRENT_CITY,
        payload: value
    };
};

export const updateCityList = arr => {
    return dispatch => {
        getWeather(arr).then(e => {
            return Promise.all(e)
        }).then(e => {
            dispatch((loadCityList(e)))
        })
        .catch(error => console.log(error))
    };
};

export const loadCurrentCity = (lat, lon) => dispatch => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then(e => {
        return e.data
    })
    .then(data => {
        const temp = `${Math.round(+data.main.temp - 273.15)}${String.fromCharCode(0x2103)}`;
        return {
            city: data.name,
            data: createItem(data, temp)
        }
    })
    .then(current_city => {
        dispatch(getCurrentCity(current_city))
    })
    .catch(error => console.log(error))
};

const getWeather = async city_list => {
    const new_city_list = await city_list.map(e => loadWeather(e.city).then(data => {
       return {city: e.city, data}
    }).catch(error => console.log(error)))
    return new_city_list
};

const loadWeather = async city => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
        const response = await axios.get(url)
        console.log(response.status)
        const data = response.data
        const temp = `${Math.round(data.main.temp)}${String.fromCharCode(0x2103)}`;
        return createItem(data, temp)
    }

    catch (e) {
        return {}
    };
};

const createItem = (data, temp) => {
    return {
        weather: data.weather[0].main,
        temp,
        wind: `${data.wind.speed} m/s`,
        pressure: `${data.main.pressure} hPa`,
        humidity: `${data.main.humidity}%`,
        icon: data.weather[0]['icon']
    }
}