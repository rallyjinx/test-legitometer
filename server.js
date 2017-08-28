const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const path = require('path');
const cors = require('cors');
require('dotenv').config()
// Set up the express app
const app = express();

app.set('port', (process.env.PORT || 3001));
//app.use(express.static(path.join(__dirname, '/app/public')));
// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('app/build'));
}
app.get('/', function (req, res) {
  const index = path.join(__dirname, 'public', 'index.html');
 res.sendFile('./index.html');
});

// Log requests to the console.
app.use(logger('dev'));

// added from https://stackoverflow.com/questions/31552088/blocked-loading-http-mixed-content-on-heroku
app.use(function (req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: false })); //the internet says this should be true
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cookieSession({
  secret: "squirrel"
}))

app.use(cors());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next();
})

const bookshelf = app.get('./app/db/knex')
app.set('bookshelf', bookshelf);

const missions = require('./app/src/routes/missions');
const casefiles = require('./app/src/routes/casefiles');
const articles = require('./app/src/routes/articles');
const reviews = require('./app/src/routes/reviews');
const users = require('./app/src/routes/users');

// TODO
// app.use('/games', gamesRouter);
// something like that. so in your games router file the route get('/' ...) will actually be at /games/

app.use(missions);
app.use(casefiles);
app.use(articles);
app.use(reviews);
app.use(users);

const port = process.env.PORT || 8888;

app.listen(port, () => {
  if (app.get('env') !== 'test') {
    console.log('Listening on port', port);
  }
});

module.exports = app;
