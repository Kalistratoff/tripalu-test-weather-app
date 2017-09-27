import React from 'react';
import { Meteor } from 'meteor/meteor';

//SERVICES
import DateHelperService from './../services/DateHelperService';
import WeatherAPI from './../api/WeatherAPI';

//COMPONENTS
import { Cities } from './../api/cities';


export default class City extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedDay: 0
        }
    }

    render() {
        return (
            <div className="card">
                <h4 className="card-header">{this.props.city.cityName}, {this.props.city.countryName}
                    <span className="to-favorites" onClick={() => { this.handleFavoriteClick(this.props.city) }}>
                        <i className={this.props.isFavorite ? "fa fa-times" : "fa fa-heart-o"} aria-hidden="true"></i>
                    </span>
                </h4>
                <div className="card-body flex-space-between">
                    <div>
                        <h4 className="card-title city-name">
                            {DateHelperService.getFullDay(
                                this.props.forecast.DailyForecasts[this.state.selectedDay].Date)
                            }
                        </h4>
                        <p className="card-text no-margin">
                            {DateHelperService.getDate(
                                this.props.forecast.DailyForecasts[this.state.selectedDay].Date)
                            }
                        </p>
                        <p className="card-text">{this.props.forecast.DailyForecasts[this.state.selectedDay].Day.IconPhrase}</p>
                    </div>
                    <div className="icon-temperature">
                        <div>
                            <img src={WeatherAPI.getWeatherIcon(this.props.forecast.DailyForecasts[this.state.selectedDay].Day.Icon)} alt="" />
                        </div>
                        <div>
                            <span className="temperature">{this.props.forecast.DailyForecasts[this.state.selectedDay].Temperature.Maximum.Value} C°</span>
                        </div>
                    </div>
                </div>
                <div className="card-body forecast-days">
                    {this.renderDays(this.props.forecast.DailyForecasts)}
                </div>
            </div>
        );
    }

    //-------------------------------------

    getDay = (date) => {
        return this.state.weekdays[new Date(date).getDay()];
    }

    //-------------------------------------

    renderDays = (days) => {
        return days.map((day, index) => {

            return (
                <div className="day-preview-box" onClick={() => { this.selectDay(index) }} key={day.Date}>
                    {DateHelperService.getShortDay(day.Date)}
                    <img src={WeatherAPI.getWeatherIcon(day.Day.Icon)} alt="" />
                    <div>
                        {day.Temperature.Maximum.Value}° <span className="grey">{day.Temperature.Minimum.Value}°</span>
                    </div>
                </div>
            )

        })
    }

    //-------------------------------------

    selectDay = (index) => {
        this.state.selectedDay = index;
        this.forceUpdate();
    }

    //-------------------------------------

    handleFavoriteClick = (city) => {
        if (!this.props.isFavorite) {
            //make favorite
            this.addCityToFavorites(city);
        }
        else {
            //unfavorite
            this.removeCityPrompt(city)
        }
    }
    //-------------------------------------
    addCityToFavorites = (city) => {

        Meteor.call('city.favorite', city, (err, response) => {

            if (!err) {
                this.props.isFavorite = true;
                // hide city
                PubSub.publish('CITY_FAVORITED', city.cityName);
            }
        });
    }
    //-------------------------------------
    removeCityPrompt = (city) => {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to know if it is Rainy or Sunny in "+city.cityName+"!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    this.removeCityFromFavorites(city.cityId);

                    swal("Poof! "+city.cityName+" has been removed from you favorites!", {
                        icon: "success",
                    });
                } else {
                    swal(city.cityName + " is safe!");
                }
            });
    }

    //-------------------------------------
    removeCityFromFavorites = (cityId) => {
        Meteor.call('city.unFavorite', cityId, (err, response) => {
            if (!err) {
                this.props.isFavorite = false;
            }
        });
    }
    //-------------------------------------
}