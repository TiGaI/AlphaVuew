"use strict";
var express = require('express');
// var multer = require('multer');
// var multerS3 = require('multer-s3');
// var aws = new require('aws-sdk');
// var s3 = new aws.S3();
var router = express.Router();

//model
const User  = require('../models/models').User;
const Activity= require('../models/models').Activity;

// //settting up S3
// var upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'newvuew',
//     key: function (req, file, cb) {
//       console.log('key', file);
//       cb(null, file.originalname)
//     }
//   })
// });

router.post('/getMyActivitiesInfo', function(req, res) {
    var profile = req.body.userID
    User.findById(profile)
    .populate('activities', 'activityTitle activityImages timeStart timeEnd')
    .exec(function(err, user) {
      if (err) {
          console.log("THIS IS AN ERROR! ", err)
          return {err, user}
      }
      if (user) {
        console.log("THIS IS THE USER BEFORE SEND: ", user)
        res.send(user)
        return user
      } else {
        console.log('fail in getMyActivitiesInfo! no user')
      }
    })
  });


// router.post('/createActivity', upload.single('file'), function(req, res){
//
//     var activity = req.body.activity;
//     console.log("this is the body: ", activity)
//     console.log("form Data", req.file)
//     Activity.findOne({$and: [{activityTitle: req.body.activityTitle},
//       {activityCreator: activity.activityCreator}]}, function(err, activityfind) {
//       if (err) {
//                 return {err, user}
//       }
//
//     if(!activityfind){
//       console.log("Creating an activity")
//       var newActivity = new Activity({
//         activityCreator: activity.activityCreator,
//         activityTitle: activity.activityTitle,
//         activityImages: activity.activityImages,
//         activityDescription: activity.activityDescription,
//         typeofRoom: activity.typeofRoom,
//         activityCategory: activity.activityCategory,
//         timeStart: activity.timeStart,
//         timeEnd: activity.timeEnd,
//         activityImages: activity.activityImages ? activity.activityImages : ['http://www.bandartigiana.it/bnd/wp-content/uploads/2016/05/default-image.png'],
//         // activityVideo: req.files['video'] ? req.files['video'][0].location : '',
//         activityLocation: activity.activityLocation,
//         interestUser: [],
//         activityCapacity: activity.activityCapacity
//       })
//
//       newActivity.save(function(err, activityNew){
//         if (err) {
//           console.log('error has occur: ',  err)
//         } else {
//           console.log('Nice, you created a file')
//           console.log(activityNew);
//           User.findById(activityNew.activityCreator, function(err, user){
//             console.log(user)
//             user.activities = [...user.activities, ...[activityNew._id]]
//             user.save(function(err){
//               if (err) {
//                 console.log('error has occur: ',  err)
//               } else {
//                 console.log('Nice, activity added in the user model')
//               }
//             })
//           })
//
//         }
//       })
//     }else{
//       console.log('activity already exist!')
//     }
//
//   })
// });

//populate activities by category

router.post('/populateActivities', function(req, res) {

  var currActivities;
  var prevActivities;
  var nextActivities;
  var activitiesObject = {}

  Activity.find({activityCategory: req.body.category}).sort('-createdAt').populate({
    path:'activityCreator',
    options: {
        limit: req.body.length,
        sort: { created: -1},
    }
  })
  .exec(function (err, articles) {
      if (err) console.log('error is good');
      var currArticles = articles
      currActivities = [...currArticles]
      activitiesObject["currCategory"] = currActivities
      return activitiesObject
    }).then((response) => {

      Activity.find({activityCategory: req.body.prevCategory}).sort('-createdAt').populate({
        path:'activityCreator',
        options: {
            limit: req.body.length,
            sort: { created: -1},
        }
      }).exec(function (err, prevArticles) {

          if (err) console.log('error is good');

          prevActivities = [...prevArticles]
          activitiesObject["prevCategory"] = prevActivities

          return response;
        }).then(() => {
        Activity.find({activityCategory: req.body.nextCategory}).sort('-createdAt').populate({
          path:'activityCreator',
          options: {
              limit: req.body.length,
              sort: { created: -1},
          }
        }).exec(function (err, nextArticles) {
            if (err) console.log('error is good');
            nextActivities = [...nextArticles]
            activitiesObject["nextCategory"] = nextActivities
            return response
          }).then(() => {
              res.send(activitiesObject);
          })
        })
      })
    })


// TODO: Edit an activity
router.post('/editActivity', function(req, res) {
    // req.body.id
    Activity.findOneAndUpdate({_id: req.body.id}, req.body.data, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");
    });

});

router.post('/getActivityOwner', function(req, res){

  User.findOne({_id: req.body.userID}, function(err, user) {
          if (err) {
              return {err, user}
          }
          if (user) {
              return user
          } else {
            console.log("cannot find activity owner");
            return null
          }
    });

});


module.exports = router;
