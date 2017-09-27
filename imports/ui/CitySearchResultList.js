import React from 'react';

//COMPONENTS
import CitySearchResult from '././CitySearchResult';

export default class CitySearchResultList extends React.Component {

    render() {
        return (
            <div>
                {this.renderCities(this.props.cities)}
            </div>
        );
    }

    // ------------------------------------
    renderCities = (cities) => {

        if (cities.length > 0) {
            return cities.map((city) => {
                return <CitySearchResult key={city.Key} city={city}/>;
            });
        }
    };

}