var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var storedName = mongoose.model('storedName', { name: String });


var names = new storedName({ name: 'Zildjian' });
names.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('db is created');
  }
});
