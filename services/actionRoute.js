"use strict";
var express = require('express');
var router = express.Router();

//model
const User  = require('../models/models').User;
const Activity= require('../models/models').Activity;
const userNotification= require('../models/models').userNotification;

router.post('/joinActivity', function(req, res){
  userNotification.find({$and: [
          {user: req.body.userID},
          {activity: req.body.activityID}]})
          .exec(function(res, action){

            if(err){
              console.log(err);
              res.send(err);
              return err;
            }

            if(action){

                var newuserNotification = new userNotification({
                  user: action.userID,
                  activity: action.activityID,
                  message: ' has join activity at '
                });

                newuserNotification.save(function(err){

                    if(err){
                      console.log(err);
                    }else{
                      SaveIntoActivityAndUser(req.body.userID, req.body.activityID);
                      CurrentCheckInUser(req.body.userID, req.body.activityID);
                    }

                })
            }else{
              console.log('You already join this activity!');
            }
          })
});

function SaveIntoActivityAndUser(userID, activityID){

  Activity.findById(activityID, function(err, activity) {

    if (err) {
        return {err, activity}
    }

    if(activity){
      activity.BTDTUser = [...activity.BTDTUser, ...[userID]]
      activity.save(function(err, activity){
        if (err) {
          res.send(err)
          console.log(err)
        } else {

          User.findById(userID, function(err, user){
            if(user){

              user.BTDTactivities = [...user.BTDTactivities, ...[activityID]]

                user.save(function(err){
                  if (err) {
                    res.send(err)
                    console.log(err)
                  } else {
                    res.send('success')
                  }
                })
            }else{
              console.log("this user does not exist!");
            }
          });
        }
      })
    }else{
      console.log('you already send request to this friend exist!')
    }
  })

}


router.post('/getNotification', function(req, res){

    Action.find({'createdAt': {'$lt': new Date(Date.now() - 3*60*60*1000)}})
     .sort({ createdAt: -1})
     .exec( function(err, notifications) {
        if (err) {
            return {err, notifications}
        }

      if(notifications){
          console.log('hoping this is a array: ', notifications)

             res.send(notifications)

      }else{
        res.send(null)
        return null
        console.log('No Friend Request notification')
      }
    })
  });


module.exports = router;
