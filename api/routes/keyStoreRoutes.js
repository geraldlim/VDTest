'use strict';
module.exports = function(app) {
  var keyStore = require('../controllers/keyStoreController');

  app.route('/object')
    .post(keyStore.create_a_object);

  app.route('/object/:key')
    .get(keyStore.read_a_object)
};
