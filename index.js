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

app.get('/greeted', function(req, res) {
  models.StoredName.find({}, function(err, person) {
    if (err) {
      return cb(err);
    }
    // console.log(person);
    res.render('greetedindex',{greeted: person});
});
});
app.get('/counter/:name', function(req, res, done) {
  var name = req.params.name;
  models.StoredName.findOne({
    name: req.params.name
  }, function(err, counter) {
    if (err) {
      return done(err);
    }
    if (counter !== null) {
      var msg = counter.name + ' has been greeted '+ counter.count + ' times.'
      res.render('counterindex',{counter: msg});

    }
    else{
      res.render('counterindex')
    }
    // console.log(counter);
});
});


function storeName(myName, cb) {
  models.StoredName.findOne({
    name: myName
  }, function(err, person) {
    if (err) {
      return cb(err);
    } else if (person === null) {
      var names = new models.StoredName({
        name: myName,
        count: 1
      });
      names.save(cb);
    } else if (person) {
      person.count++;
      person.save(cb);
    }
  })
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
