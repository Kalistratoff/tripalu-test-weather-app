import React from 'react';
import { Meteor } from 'meteor/meteor';

//COMPONENTS
import City from '././City';

//SERVICES
import WeatherAPI from './../api/WeatherAPI';

export default class MyCities
    extends React.Component {

    constructor() {
        super();
        PubSub.subscribe('CITIES_DATA', this.handleCitiesData);
        this.state = {
            favoriteCities: [],
            citiesExist: true
        }
    }

    render() {
        return (
            <div>
                {this.getCitiesDataFeedBack(this.state.citiesExist)}
                {this.renderCities(this.state.favoriteCities)}
            </div>
        );
    }

    //-----------------------------------------
    renderCities = (cities) => {

        if (cities.length > 0) {
            return cities.map((city, i) =>
                (
                    <div className="city-container" key={i}>
                        <City forecast={city} city={city} isFavorite={true} />
                    </div>
                )
            );
        }
        else {
            setTimeout(() => {
                this.setState({ citiesExist: this.state.favoriteCities.length != 0 })
            }, 3000);
        }

    }

    //-----------------------------------------

    getCitiesDataFeedBack = (citiesExist) => {

        if (citiesExist && this.state.favoriteCities.length > 0) {
            return "";
        }
        else if (citiesExist) {
            return <p className="citiesDataFeedback">Trying to fetch the data....</p>;
        }
        else {
            return <p className="citiesDataFeedback">
                There are no cities in your favorites list, you can add one <a href="/search">here ...</a>
            </p>
        }

    }

    //-----------------------------------------

    handleCitiesData = (msg, cities) => {

        var citiesToFetch = [];

        cities.map((city) => {
            citiesToFetch.push(WeatherAPI.getForecastByCityKey(city.favoriteCityId));
        });

        Promise.all(citiesToFetch)
            .then((citiesResponse) => citiesResponse.map((city) => city.json()))
            .then((cityAsJson) => Promise.all(cityAsJson))
            .then((citiesJsObjects) => {

                citiesJsObjects = citiesJsObjects.map((city, i) => {
                    city.cityName = cities[i].cityName;
                    city.countryName = cities[i].countryName;
                    city.cityId = cities[i].favoriteCityId;

                    return city;

                })
                this.setState({ favoriteCities: citiesJsObjects });
            });
    }
}