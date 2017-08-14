var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var models = require('./models')


var app = express();


app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

app.use(bodyParser.json());

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
  res.render('index');
});

function storeName(myName, cb) {
  var names = new models.StoredName({
    name: myName,
    count: 1
  });
  var saveName = names.save(cb);
};


app.post('/greetings', function(req, res) {

  var language = req.body.language;

  var myTextMsg = "";

  var myName = req.body.inputName;

  if (language === 'English') {
    myTextMsg = "Hello, " + myName;
  } else if (language === 'isiXhosa') {
    myTextMsg = "Molo, " + myName;
  } else if (language === 'Swahili') {
    myTextMsg = "Hodi, " + myName;
  }
  storeName(myName, function(err) {
    models.StoredName.count({}, function(err, count) {
      if (err) {
        console.log(err);
      } else {
        res.render("index", {
          greet: myTextMsg,
          counter: count
        });
      }
    })
  })
});

var port = process.env.PORT || 3000

app.listen(port);
