"use strict";
var express = require('express');
var router = express.Router();

//model
const User  = require('../models/models').User;
const Activity= require('../models/models').Activity;
const ActivityAction= require('../models/models').ActivityAction;
const FriendRequest= require('../models/models').FriendRequest;

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())

router.post('/sendFriendRequest', function(req, res){

  FriendRequest.find({$and: [
          {toUser: req.body.toUser},
          {fromUser: req.body.fromUser}]}, function(err, friendRequest) {
      if (err) {
          return {err, friendRequest}
      }

    console.log(friendRequest);

    if(friendRequest.length === 0){
      User.find({toUser: req.body.toUser}, function(err, user){
        if(user){
            console.log('adding a new friend')
            var newFriend = new FriendRequest({
              toUser: req.body.toUser,
              fromUser: req.body.fromUser,
              accepted: false
            })
            newFriend.save(function(err){
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
    }else{
      console.log('you already send request to this friend exist!')
    }
  })
});


router.post('/getNotification', function(req, res){
    FriendRequest.find({toUser: req.body.userID})
     .sort({ createAt: -1})
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

router.post('/acceptFriendRequest', function(req, res){
  console.log(req.body);
    FriendRequest.findOneAndRemove({$and: [
        {toUser: req.body.toUserID},
        {fromUser: req.body.fromUserID}]}, function(err, friendRequest) {
      if (err) {
          return {err, friendRequest}
      }

      console.log(friendRequest);

    if(friendRequest){

      User.find({$or: [
        {_id: req.body.toUserID},
        {_id: req.body.fromUserID}]},function(err, users){
        if(users){
            if(req.body.accepted){
              friendRequest.accepted = req.body.accepted

              console.log("I accepted a friend")
              users.map(function(user, index){
                console.log(user._id == req.body.toUserID)
                if(user._id == req.body.toUserID){
                  user.connections = user.connections.concat(req.body.fromUserID)
                }else{
                  user.connections = user.connections.concat(req.body.toUserID)
                }
                user.save(function(err){
                  if (err) {
                    console.log(err);
                  } else {
                    res.send(user)
                    return user
                  }
                })
              });
            }else{
              friendRequest.accepted = req.body.accepted
              res.send(friendRequest)
              console.log("I rejected a friend")
            }
        }else{
          res.send('fail')
          console.log("this user does not exist!");
        }
      });
    }else{
      res.send('fail')
      console.log('you have not send a friend request him yet.')
    }
  })
});

router.post('/joinActivity', function(req, res){

    ActivityAction.find({$and: [
        {toUser: req.body.toUserID},
        {fromUser: req.body.fromUserID}]}).exec(function(err, activityRequest) {
      if (err) {
          return {err, activityRequest}
      }

    if(activityRequest.length === 0){

        var newMessage = new ActivityAction({
          fromUser: req.body.fromUserID,
          toUser: req.boby.toUserID,
          activity: req.body.activityID,
          accepted: false
        })

        newMessage.save(function(err, newMessage){
          if(err){
            console.log('this is the err in joinActivity: ', err);
            return err
          }
          console.log('this is the newMessage: ',newMessage);
          return newMessage
        });

        return(activityRequest)

    }else{
        console.log('your already join this activity')
        return(activityRequest)
    }
  })
});

router.post('/getActivityRequest', function(req, res){

    ActivityAction.find({toUser: req.body.userID})
    .populate('activity', 'activityTitle timeStart activityCapacity').exec(function(err, activityRequest) {
      if (err) {
          return {err, activityRequest}
      }

    if(activityRequest.length === 0){
        console.log('nothing is found!')
        res.send(activityRequest)
        return(activityRequest)

    }else{
        console.log("activity request for this user: ", activityRequest)
        res.send(activityRequest)
        return(activityRequest)
    }
  })
});

router.post('/acceptActivityRequest', function(req, res){

  ActivityAction.findOneAndRemove({$and: [
      {toUser: req.body.toUserID},
      {fromUser: req.body.fromUserID},
      {activity: req.body.activityID}]}, function(err, activityRequest) {

    if (err) {
      console.log(err);
        return {err, activityRequest}
    }

    console.log(activityRequest);

        if(activityRequest){

          Activity.find({_id: req.body.toUserID}, function(err, activity){
            if(activity){
                if(req.body.accepted){
                  activityRequest.accepted = req.body.accepted
                  activity.interestUser = [...activity.interestUser, ...[req.body.fromUser]]
                }else{
                  activityRequest.accepted = req.body.accepted
                  res.send(activityRequest)
                  console.log("I decline your activityRequest")
                }
            }else{
              res.send('fail')
              console.log("this user does not exist!");
            }
          });
        }else{
          res.send('fail')
          console.log('you have not send a friend request him yet.')
        }
      })
});

module.exports = router;
