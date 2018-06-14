var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  KeyStore = require('./api/models/keyStoreModel'), 
  bodyParser = require('body-parser');
  

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/KeyStoredb'); 


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var routes = require('./api/routes/keyStoreRoutes'); 
routes(app); 


app.listen(port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});


console.log('RESTful API server started on: ' + port);