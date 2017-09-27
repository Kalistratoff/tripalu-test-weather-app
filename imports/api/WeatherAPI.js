import Config from '././Config';

const WeatherAPI = {
    // Returns list of cities that match the query
    findCities: (cityNameQuery) => {
        return fetch(Config.ApiURL + "/locations/v1/cities/autocomplete?apikey=" +
        Config.ApiKey + "&q=" + cityNameQuery, {
            method: 'get'
        });
    },
    getForecastByCityKey: (cityKey) => {
        return fetch(Config.ApiURL + "/forecasts/v1/daily/5day/" + cityKey +
        "?apikey=" + Config.ApiKey + "&metric=true", {
            method: 'get'
        });
    },
    getWeatherIcon: (iconNumber) =>{
        if(iconNumber<10){
            iconNumber = "0" + iconNumber;
        }

        return Config.IconsURL.replace('{ICON_NUMBER}', iconNumber);
    }
}

export default WeatherAPI;