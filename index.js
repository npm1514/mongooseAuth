const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');//local auth
const session = require('express-session');//session

const app = express();

var userCtrl = require('./controllers/userCtrl');
var movieCtrl = require('./controllers/movieCtrl');

require('./config/passport')(passport);//self invokes passport

app.use(session({
    secret: 'banana',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'));

app.post('/auth', passport.authenticate('local-signup'), userCtrl.login);
app.get('/getMe', userCtrl.getMe);
app.get('/logout', userCtrl.logout);

app.get('/users', userCtrl.read);
app.put('/users/:id', userCtrl.update);
app.delete('/users/:id', userCtrl.destroy);

app.get('/movies', movieCtrl.read);
app.post('/movies', movieCtrl.create);
app.put('/movies/:id', movieCtrl.update);
app.delete('/movies/:id', movieCtrl.destroy);

mongoose.connect("mongodb://localhost:27017/usersNThings");
mongoose.connection.once('open', function(){
  console.log("connected to mongoDB");
});

app.listen(8000, function(){
  console.log("listening on 8000");
});
