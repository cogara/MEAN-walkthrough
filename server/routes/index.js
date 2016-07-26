var router = require('express').Router();
var path = require('path');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.connect('mongodb://localhost/basic_walking_skeleton');

var catSchema = new Schema({
  name: String
});

var Cat = mongoose.model('Cat', catSchema);

router.get('/', function(request, response, next) {
  response.sendFile(path.join(__dirname, '..', 'public', 'views', 'index.html'));
  console.log('Here is a console log');
});

router.post('/add', function(request, response, next) {
  console.log(request.body);
  var kitty = new Cat({name: request.body.name});
  kitty.save(function(err){
    if (err) {
      console.log('meow %s', err);
    }
    response.sendStatus(200);
    next();
  });
});

router.get('/cats', function(request, response, next){
  Cat.find({}, function(err, cats){
    if (err) {
      throw new Error(err);
    }
    console.log('Cats:', cats);
    console.log('JSON:', JSON.stringify(cats));
    // response.send(JSON.stringify(cats));
    response.send(cats);
    next();
  });
});







module.exports = router;
