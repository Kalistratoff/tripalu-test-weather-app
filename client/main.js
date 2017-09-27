// REACT
import React from 'react';
import ReactDOM from 'react-dom';
import { renderRoutes } from './../imports/Router';

// METEOR
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

// COMPONENTS
import App from './../imports/ui/App';

// API TO DB
import { Cities } from './../imports/api/cities';

// PUBSUB
import PubSub from 'pubsub-js';
import swal from 'sweetalert';

// WHEN DOM IS READY
// ================================================================
Meteor.startup(() => {

    Tracker.autorun(() => {
        // GET CITIES
        var cities = Cities.find({}).fetch();
        // Send data to MyCities component
        PubSub.publish( 'CITIES_DATA', cities);
    });

    ReactDOM.render(renderRoutes(), document.getElementById('app'));
});
