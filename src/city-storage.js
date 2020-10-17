export default class CityStorage {
    getCityList() {
        const city_list = localStorage.getItem('city_list') || []
        return city_list.length ? JSON.parse(city_list) : city_list
    };
};