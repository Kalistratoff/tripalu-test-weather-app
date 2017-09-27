import React from 'react';

export default class CitySearchResult extends React.Component {

    render() {

        return (
            <div className="city-search-result" onClick={() => this.selectCity(this.props.city)}>
                <p>
                    {this.props.city.LocalizedName} in &nbsp;
                    <span>
                        ( {this.props.city.AdministrativeArea.LocalizedName},
                        {this.props.city.Country.LocalizedName} )
                    </span>
                </p>
            </div>
        );
    }

    //-----------------------------------------------------------

    selectCity = (selectedCity) => {
        PubSub.publish('CITY_SELECTED', selectedCity);
    };
}