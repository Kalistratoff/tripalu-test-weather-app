import React from 'react';
import { Meteor } from 'meteor/meteor';

//SERVICES
import WeatherAPI from './../api/WeatherAPI';
import { Cities } from './../api/cities';

//COMPONENTS
import CitySearchResultList from '././CitySearchResultList';
import City from '././City';

export default class CitySearch extends React.Component {

    constructor() {
        super();
        PubSub.subscribe('CITY_SELECTED', this.citySelected);
        PubSub.subscribe('CITY_FAVORITED', this.cityFavorited);

        this.state = {
            cityNameQuery: '',
            cities: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <form onSubmit={this.handleSumbit}>
                            <div className="input-group">
                                <input type="text" className="form-control"
                                    placeholder="Search for a city..."
                                    aria-label="Search for..."
                                    name="cityNameQuery"
                                    value={this.state.cityNameQuery}
                                    onChange={this.handleChange}>
                                </input>

                                <span className="input-group-btn">
                                    <button className="btn btn-success" type="submit">
                                        Search
                                </button>
                                </span>
                            </div>
                        </form>
                    </div>
                    <div className="city-search-result-list">
                        {this.renderCities(this.state.cities)}
                    </div>
                    <div className="city-container">
                        {this.showSpinner(this.state.showSpinner)}
                        {this.showSelectedCity(this.state.selectedCityForecast)}
                    </div>
                </div>
            </div>
        );
    }

    //-----------------------------------------------------
    showSpinner = (showSpinner) => {
        if (showSpinner) {
            return (
                <div className="loader-container">
                    <i className="fa fa-spinner fa-spin fa-3x fa-fw loader"></i>
                    <span className="loader-text">Loading the city data...</span>
                </div>
            );
        }
    }
    //-----------------------------------------------------
    // SUBMIT || Search Button Click
    handleSumbit = (event) => {

        event.preventDefault();

        if (event.target.cityNameQuery.value) {
            this.fetchCities(event.target.cityNameQuery.value);
        }
    };
    //-----------------------------------------------------
    // On Key Press
    handleChange(event) {

        if (!event.target.value) {
            return;
        }

        this.setState({ cityNameQuery: event.target.value });

        if ((event.target.value.length > 5)) {
            this.fetchCities(event.target.value);
        }
    }
    // ------------------------------------
    renderCities = (cities) => {
        return <CitySearchResultList cities={cities} />;
    };
    // ------------------------------------
    showSelectedCity = (selectedCityForecast) => {
        if (selectedCityForecast) {
            return <City forecast={selectedCityForecast} city={this.state.selectedCity} />
        }
    }
    //-----------------------------------------------------
    // FETCH Cities
    fetchCities = (cityNameQuery) => {

        WeatherAPI.findCities(cityNameQuery)
            .then((response) => { return response.json() })
            .then((cities) => {
                this.setState({ cities: cities });
            })
            .catch((error) => { console.error(error); });
    }
    //-----------------------------------------------------

    cityFavorited = (msg, cityName) => {
        swal("Success!", cityName + " is successfully added to you favorites list!", "success");
        setTimeout(() => {
            this.setState({ selectedCityForecast: undefined });
        }, 1500);
    }

    //-----------------------------------------------------
    // FETCH CITY 5 DAY FORECAST
    citySelected = (msg, city) => {

        // HIDE SEARCH RESULT
        this.setState({ cities: [] });

        // SHOW LOADING SPINNER
        this.setState({ showSpinner: true });

        //FETCH SELECTED CITY DATA
        WeatherAPI.getForecastByCityKey(city.Key)
            .then((response) => { return response.json() })
            .then((forecast) => {
                // HIDE LOADING SPINNER
                this.setState({ showSpinner: false });
                this.setState({
                    selectedCity: {
                        cityId: city.Key,
                        cityName: city.LocalizedName,
                        countryName: city.Country.LocalizedName
                    }
                });
                this.setState({ selectedCityForecast: forecast });
            })
            .catch((error) => { console.error(error); });
    }

}