/**
 * Created by NguyenManh on 6/15/2016.
 */
/*Require module using application*/
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var request = require('request');

var app = express();

// View engine default
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set default path => Show and connect file -html.css and javascript
app.use(express.static(path.join(__dirname, 'dist/test')));
app.use(express.static(path.join(__dirname, 'asset-static')));
app.use(express.static('views'));
console.log(path.resolve(__dirname, '..'));

app.use(session({
  secret: 'teamdevmasterleadmanhnv_master',
  resave: true,
  saveUninitialized: false
}));

app.listen(84, () => {
  "use strict";
  console.log('App running port: ' + 84);
});