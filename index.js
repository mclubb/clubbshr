var express = require('express');
var body_parser = require('body-parser');
var express_session = require('express-session');

// Create our app
var app = express();

app.locals.pretty = true;
// Setup the view engine
app.set('view engine', 'pug');
// Setup the session manager
app.use(express_session({ secret:'clubbshr', cookie:{}, saveUninitialized: false, resave: false}));

app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());

app.use(express.static('public'));

//var indexRoute = require('./routes/index');
app.use('/', function(req, res) {
    res.render('index');
});
app.listen('8090', function() {
    console.log("listening");
});

