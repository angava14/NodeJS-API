"use strict";
const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const path = require('path');
const config = require("./config");
const api = require("./api");
const Cors = require('cors');

// Connect to database
/*mongoose.connect(config.db.url);*/

const app = express(); 
app.use(Cors());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + "/images")); 
app.use(morgan("common")); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
 
app.use("/api", api);
app.use("/api/v1", api);
 


 
app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})



app.use( (req, res, next) => {
  console.log("Route not found");
  res.status(404);
  res.json({
    "error": "Error. Route not found"
  });
});


var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});