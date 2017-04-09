"use strict";
var express = require('express');
var router = express.Router();

//model
const User  = require('../models/models').User;
const Activity= require('../models/models').Activity;

// dlon = lon2 - lon1
// dlat = lat2 - lat1
// a = (sin(dlat/2))^2 + cos(lat1) * cos(lat2) * (sin(dlon/2))^2
// c = 2 * atan2( sqrt(a), sqrt(1-a) )
// d = R * c (where R is the radius of the Earth)

function getRangeofLonLat(lon, lat, kilometer){

  return {minLatitude: lat - kilometer/110.574,
          maxLatitude: lat +  kilometer/110.574,
          minLongitude: lon - 111.320*cos(lat + kilometer/110.574),
          maxLongitude: lon + 111.320*cos(lat + kilometer/110.574)}
}

router.post('/getPingsAroundMe', function(req, res){
  console.log('INSIDE GET PING AROUND ME SERVER')
    var range = getRangeofLonLat(req.body.lon. req.body.lat, 5);

    Activity.find({$and: [
          {'activityLatitude': {'$gte': range.minLatitude, '$lt': range.maxLatitude}},
          {'activityLongitude': {'$gte': range.minLongitude, '$lt': range.maxLongitude}},
          {'activityCategory': {$in : req.body.category}}
        ]}).exec(function(err, activities){

          if(err){
            console.log(err);
            res.send(err);
            return err
          }

          activities.map((activity, index) => {



          })


          res.send(activities);
          return activities;
    });
});

router.post('/createActivity', function(req, res){
var activity = req.body.activity;
  Activity.findOne({$and: [
          {'activityLatitude': activity.activityLatitude},
          {'activityLongitude': activity.activityLongitude}]}).exec(function(err, activities){

        if(err){
          console.log(err);
          res.send(err);
          return err
        }

        if(!activities){
          var newActivity = new Activity({
                activityCreator: activity.activityCreator,
                activityTitle: activity.activityTitle,
                activityDescription: activity.activityDescription,
                activityCategory: activity.activityCategory,
                activityLatitude: activity.activityLatitude,
                activityLongitude: activity.activityLongitude,
                BTDTUser: []
              })

              newActivity.save(function(err, activityNew){
                if (err) {
                  console.log('error has occur: ',  err)
                } else {
                  console.log('Nice, you created a file')
                  console.log(activityNew);
                  User.findById(activityNew.activityCreator, function(err, user){
                    user.createdActivities = [...user.createdActivities, ...[activityNew._id]]
                    user.save(function(err){
                      if (err) {
                        console.log('error has occur: ',  err)
                      } else {
                        console.log('Nice, activity added in the user model')
                      }
                    })
                  })

                }
              })
        }else{
          console.log('activities already exist!');
          return null;
        }

        res.send(activities);
        return activities;
  });

});

module.exports = router;
