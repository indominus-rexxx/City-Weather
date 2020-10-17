import * as actionTypes from '../action-types';

const initData = {
    city_list: [],
    current_city: null
}

const reducer = (state = initData, action) => {
    switch (action.type) {
        case actionTypes.LOAD_CITY_LIST:
            return {
                ...state,
                city_list: action.payload
            }
        case actionTypes.ADD_CITY:
            return {
                ...state,
                city_list: action.payload
            }
        case actionTypes.DELETE_CITY:
            return {
                ...state,
                city_list: updateCityList(state.city_list, action.payload)
            }
        case actionTypes.GET_CURRENT_CITY:
            return {
                ...state,
                current_city: action.payload
            }
    
        default:
            return state;
    }
}

const updateCityList = (city_list, idx) => {
    return [
        ...city_list.slice(0, idx),
        ...city_list.slice(idx + 1)
    ]
}

export default reducer;