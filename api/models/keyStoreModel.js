'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KeyStoreSchema = new Schema({
  key: {
    type: String
  },
  value: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('KeyStore', KeyStoreSchema);