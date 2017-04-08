var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  //How can we keep track of User Activity?
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: ""
  },
  gender: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  profileImg: {
    type: String
  },
  interestsTag: [],
  admin: {
    type: Boolean,
    default: false
  },
  BTDTactivities: [{type: mongoose.Schema.Types.ObjectId, ref: 'Activity'}],
  createdActivities: [{type: mongoose.Schema.Types.ObjectId, ref: 'Activity'}],
},
{ timestamps: true }
);

var activitySchema = new mongoose.Schema({
  //How can we keep track of User Activity?
  activityCreator: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  activityTitle: {
    type: String,
    required: true
  },
  activityImages: String,
  activityDescription: {
    type: String,
    default: "",
    required: true
  },
  activityLatitude: {
    type: Number,
    required: true
  },
  activityLongitude: {
    type: Number,
    required: true
  },
  activityCategory:{
    type: String,
    required: true
  },
  BTDTUser: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
},
{ timestamps: true }
);

var actionsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Activity'
  }
  },
  { timestamps: true }
);


var User = mongoose.model("User", userSchema);
var Activity = mongoose.model("Activity", activitySchema);
var Action = mongoose.model("Action", actionsSchema);

module.exports = {
  User: User,
  Activity: Activity,
  Action: Action
};
