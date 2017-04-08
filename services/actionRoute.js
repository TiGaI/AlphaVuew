"use strict";
var express = require('express');
var router = express.Router();

//model
const User  = require('../models/models').User;
const Activity= require('../models/models').Activity;
const Action= require('../models/models').Action;

router.post('/checkIn', function(req, res){
  Action.find({$and: [
          {user: req.body.userID},
          {activity: req.body.activityID}]}).exec(function(res, action){

            if(err){
              console.log(err);
              res.send(err);
              return err;
            }

            if(action){

                var newAction = new Action({
                  user: activity.userID,
                  activity: activity.activityID,
                });

                newAction.save(function(err){

                    if(err){
                      console.log(err);
                    }else{
                      SaveIntoActivityAndUser(req.body.activityID);
                    }

                })
            }else{
              console.log('You already join this activity!');
            }
          })
});

function SaveIntoActivityAndUser(activityID){

  Activity.findById(activityID, function(err, activity) {

    if (err) {
        return {err, activity}
    }

    if(activity){
      activity.BTDTUser = [...activity.BTDTUser, ...[req.body.userID]]
      activity.save(function(err, activity){
        if (err) {
          res.send(err)
          console.log(err)
        } else {

          User.findById(req.body.userID, function(err, user){
            if(user){

              user.BTDTactivities = [...user.BTDTactivities, ...[activityID]]

                user.save(function(err){
                  if (err) {
                    res.send(err)
                    console.log(err)
                  } else {
                    res.send('success')
                    console.log('Nice, you send a friend request.')
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

    Action.find({toUser: req.body.userID})
     .sort({ createdAt: -1})
     .populate('fromUser', 'firstName lastName profileImg')
     .select('fromUser').exec( function(err, friendRequests) {
        if (err) {
            return {err, friendRequests}
        }

      if(friendRequests){
          console.log('hoping this is a array: ', friendRequests)

             res.send(friendRequests)

      }else{
        res.send(null)
        return null
        console.log('No Friend Request notification')
      }
    })
  });


module.exports = router;
