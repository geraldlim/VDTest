'use strict';
var mongoose = require('mongoose');
var moment = require('moment');

var KeyStore = mongoose.model('KeyStore');


exports.create_a_object = function(req, res) {

  var data = req.body;
  
  for (var key in data) {
    if (data.hasOwnProperty(key)) {

      var new_object = new KeyStore({
        key:key,
        value:req.body[key]
      });

      new_object.save(function(err, object) {
        if (err)
          res.send(err);

        var timeString = moment(object.timestamp).format('LT');
        var obj = {"key": object.key, "value": object.value, "timestamp": timeString };
        res.json(obj);
      });

    }
  }

};


exports.read_a_object = function(req, res) {

  if (req.query.timestamp){

    var reqTime = moment.unix(req.query.timestamp);

    KeyStore.find({'key': req.params.key, 'timestamp': { "$lt": reqTime }}).sort({timestamp: -1}).limit(1).exec(function(err, result){
      
      if (err)
        res.send(err);

      if(result[0]){
        var obj = {"value": result[0].value};
        res.json(obj);
      }else{
        res.send("No Records found");
      }

    });

  } else {

    KeyStore.find({'key': req.params.key}).sort({timestamp: -1}).limit(1).exec(function(err, result){
      
      if (err)
        res.send(err);

      if(result[0]){
        var obj = {"value": result[0].value};
        res.json(obj);
      }else{
        res.send("No Records found");
      }

    });

  }

};

