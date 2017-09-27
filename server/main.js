import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// API TO DB
import { Cities } from './../imports/api/cities';

Meteor.methods({

  'city.getAll'() {
    return Cities.find({}).fetch();
  },

  //-----------------------
  'city.favorite'(city) {

    check(city, Object);

    Cities.insert({
      favoriteCityId: city.cityId ,
      cityName      : city.cityName,
      countryName   : city.countryName 
    }, (err, response) =>{
        if(err){
            throw new Meteor.Error(503, err);
        }else{
            return true;
        }
    });
  },

  //-----------------------
  'city.unFavorite'(cityId) {

    check(cityId, String);

    Cities.remove({
      favoriteCityId: cityId
    }, (err, response) =>{
        if(err){
            throw new Meteor.Error(503, err);
        }else{
            return true;
        }
    });
  },

});


Meteor.startup(() => {
});

