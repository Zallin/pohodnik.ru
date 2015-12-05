var express = require('express'),
    cons = require('consolidate'),
    bodyParser = require('body-parser');
    db = require('./db');

var app = express();

app.engine('html', cons.handlebars);

app.set('view engine', 'html');
app.set('views', __dirname + '\\views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : false}));

app.get('/', function (req, res){
  res.render('index.html', {});
});

app.get('/add_hike', function (req, res){
  res.render('add.html', {});
});

app.post('/add_hike', function (req, res){
  var coordinates = req.body.coords.split(';');

  req.body.coordinates = coordinates;

  db.addHike(req.body, function (err){
    if(err) return res.send(500);
    res.redirect('/add_hike');
  });
});

app.get('/hikes_points', function (req, res){
  db.getHikes(function (err, data){
    if(err) return res.status(500).send();
    res.send(data);
  });
});

app.get('/hikes_catalogue', function (req, res){
 // rendering hikes page
});

app.get('/hikes/:id', function (req, res){
  //
});

var server = app.listen(80, function (){
  console.log('server is up')
});
