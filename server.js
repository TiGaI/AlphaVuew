"use strict";

const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');

var helmet = require('helmet');

const mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;

mongoose.connect(connect);

var compression = require('compression');
//linking file

var authRoute = require('./services/authRoute');
var activityRoute = require('./services/activityRoute');
var actionRoute = require('./services/actionRoute');


function updatedStatusOnMap() {
    
}
updatedStatusOnMap(); //run function once on startup
setInterval(updatedStatusOnMap, 5 * 60 * 1000)


app.use(helmet());

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true}));

app.use(bodyParser.json());

app.use('/', authRoute);
app.use('/', activityRoute);
app.use('/', actionRoute);




var port = process.env.PORT || 8080;
http.listen(port, function() {
  console.log('Express started. Listening on %s', port);
});
