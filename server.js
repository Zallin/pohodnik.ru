var express = require('express'),
    cons = require('consolidate'),
    bodyParser = require('body-parser');
    db = require('./db'),
    api = require('./api/api.js');

var user;

var app = express();

app.engine('html', cons.handlebars);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())

app.get('/', function (req, res){
  res.render('index.html', {username : user});
});

app.get('/add_hike', function (req, res){
  res.render('add.html', {username : user});
});

app.post('/add_hike', function (req, res){
  var coordinates = req.body.coords.split(';'),
      permalink = Math.floor(Math.random() * Math.pow(10, 5));

  req.body.coordinates = coordinates;
  req.body.permalink = permalink;

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

app.get('/hikes/:permalink', function (req, res){
  db.getHike(req.params.permalink, function (err, doc){
    if(err) return res.status(500).send();
    res.render('hike.html', {hike : doc, username : user});
  });
});

app.post('/hike_by_coordinate', function (req, res){
    var coords = [req.body["0"], req.body["1"]];
    db.getPermalinkByCoordinate(coords, function (err, permalink){
      if(err) return res.status(500).send();
      res.send({permalink : permalink});
    });
});

app.get('/login', function (req, res){
  res.render('login.html');
})

app.post('/login', function (req, res){
  user = req.body.username;

  res.redirect('/');
});

app.get('/logout', function (req, res){
  user = null;

  res.redirect('/');
});

app.post('/point_in_radius', function (req, res){
  var coordinates = [req.body["0"], req.body["1"]];
  api.getObjectsInRadius(coordinates, function (err, obj){
    if(err) return res.status(500).send();
    res.send(obj);
  });
});

app.post('/join', function (req, res){
  db.addUserToHike(req.body, function (err){
    if(err) return res.status(500).send();
    res.redirect('/hikes/' + req.body.permalink);
  })
});

var server = app.listen(80, function (){
  console.log('server is up');
});
