"use strict";
var express = require('express');
var router = express.Router();

//model
const User  = require('../models/models').User;
const Activity= require('../models/models').Activity;

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())

router.post('/BTDT', function(req, res){

  Activity.findById(req.body.activityID, function(err, activity) {

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

              user.BTDTactivities = [...user.BTDTactivities, ...[req.body.activityID]]

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
});


module.exports = router;
