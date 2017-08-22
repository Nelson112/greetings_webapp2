var mongoose = require('mongoose');
var mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/users";

mongoose.connect(mongoURL, {
  useMongoClient: true,
});
exports.StoredName = mongoose.model('storedName', {
  name: String,
  count: Number
});
