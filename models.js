var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users',{
   useMongoClient: true,
});

exports.StoredName = mongoose.model('storedName', {
  name: String,
  count: Number
});
