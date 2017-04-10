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
          {activity: req.body.activityID},
          {actionNumber: 1}
        ]})
          .exec(function(res, action){

            if(err){
              console.log(err);
              res.send(err);
              return err;
            }

            if(!action){

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
                      AddActionsToNotification(req.body.userID, req.body.activityID, 1);
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
      activity.checkInUser = [...activity.checkInUser, ...[userID]]
      activity.save(function(err, activity){
        if (err) {
          res.send(err)
          console.log(err)
        } else {

          User.findById(userID, function(err, user){
            if(user){

              user.joinActivities = [...user.joinActivities, ...[activityID]]

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

function AddActionsToNotification(userID, activityID, number){

  userNotification.find({$and: [
          {user: userID},
          {activity: activityID},
          {actionNumber: number}
        ]}).exec(function(err, userNotification){

          if(userNotification){

            var newuserNotification = new userNotification({
              user: userID,
              activity: activityID,
              actionNumber: number
            })

            newuserNotification.save(function(err){
              if(err){
                console.log(err);
                res.send(err);
              }
            })
          }else{
            console.log('notification has already being created!');
            res.send('notification has already being created!');
          }
        })
}


router.post('/leaveActivity', function(req, res){
  userNotification.find({$and: [
          {user: req.body.userID},
          {activity: req.body.userID},
          {actionNumber: 1}
        ]}).exec(function(res, action){

            if(err){
              console.log(err);
              res.send(err);
              return err;
            }

            if(action){

              RemoveUserFromActivityAndUserModel(req.body.userID, req.body.userID);
              AddActionsToNotification(req.body.userID, req.body.userID, 2);

            }else{
              console.log('You cannot leave something you can did not join!');
            }
          })
});


function RemoveUserFromActivityAndUserModel(userID, activityID){

  Activity.findById(activityID).exec(function(err, activity) {

    if (err) {
        return {err, activity}
    }

    if(activity){

      activity.checkInUser = activity.checkInUser.filter(function(item){
          return item != userID
      })


      activity.save(function(err, activity){
        if (err) {
          res.send(err)
          console.log(err)
        } else {

          User.findById(userID, function(err, user){
            if(user){

              user.joinActivities = user.joinActivities.filter(function(item){
                  return item != activityID
              })

                user.save(function(err){
                  if (err) {
                    res.send(err)
                    console.log(err)
                  } else {
                    res.send('success')
                  }
                })

            }else{
              console.log("Cannot find userID in RemoveUserFromActivityAndUserModel");
            }
          });
        }
      })
    }else{
      console.log('Cannot find activityID in RemoveUserFromActivityAndUserModel')
    }
  })
}



router.post('/getNotification', function(req, res){

    userNotification.find({'createdAt': {'$lt': new Date(Date.now() - 3*60*60*1000)}})
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
