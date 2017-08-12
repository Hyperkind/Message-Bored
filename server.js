const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
// const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const RedisStore = require('connect-redis')(session);
const saltRounds = 10;
const bcrypt = require('bcrypt');

const apiRouter = require('./routes');

const db = require('./models');
const Users = db.Users;

app.use(express.static('public'));
app.use(bodyParser.json());

// app.use(express.cookieParser());

app.use(session({
  store: new RedisStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  return done(null, {
    id: user.id,
    username: user.username
  });
});

passport.deserializeUser((user, done) => {
  Users.findById(user.id)
  .then(user => {
    return done(null, user);
  })
  .catch(err => {
    console.log('error in pass deserial', error);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('local strategy running!!!!!');
    Users.findOne({where: { username: username }})
    .then(user => {
      console.log('found user in passport.us', user);
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      bcrypt.compare(password, user.password, function(err, res) {
        if(!res){ return done(null, false, { message: 'Incorrect password.' }); }
        return done(null, user);
      });
    });
}));


app.post('/login', function(req, res, next) {
  console.log('post to /login is firing');
  console.log('this is our req.body', req.body);
  passport.authenticate('local', function (err, user, info) {
    console.log('going into authenticate');
    console.log('user from authenticate', user);

    if (err) { return res.status(500).json({err}); }

    if (!user) { return res.status(401).json({success: false}); }
    req.logIn(user, function(err) {
      if (err) {return res.status(500).json({err}); }
      console.log('successful login! from app.post');
      let {id, username} = user;
      let logedInUser = {id, username};
      return res.json(logedInUser);
    });
  })(req, res, next);
});


app.post('/register', (req, res) => {
  console.log('running a post on register');

  let {username, password} = req.body;

  bcrypt.genSalt(saltRounds, function(err, salt) {

    bcrypt.hash(password, salt, function(err, hash) {
      return Users.create({
        username: username,
        password: hash
      })
      .then(createdUser => {
        let {username, id} = createdUser;
        let user = {username, id};
        res.json(user);
      })
      .catch((error) => {
        console.log ('here is our error', error);
      });
    });
  });
});


app.get('/logout', (req, res) => {
  req.logout();
  res.json({loggedout: true});
})

app.use('/api', apiRouter);

// app.use('/', function (req, res) {
//   res.send('Hello world!!!!!!');
// });

app.get('*', (req, res) => {
  res.sendFile('./public/index.html', { root: __dirname });
});

app.listen(PORT, () => {
  console.log('server now listening on port', PORT);
  // db.sequelize.drop();
  // db.sequelize.sync({force: true});
});
