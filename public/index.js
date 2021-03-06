'use strict';

var express = require('express');
var cors = require('cors');

var server = express();
var PORT = process.env.PORT || 3000;
server.use(cors());

server.get('/', function (request, response) {

  var username = null;

  if (request.query.hasOwnProperty('username') && typeof request.query.username === 'string') {
    username = request.query.username;
  }

  if (username !== null && username.match(/^(http:|https:)?(\/\/)?(www.)?(telegram.me|vk.com|twitter.com|github.com|xn--80adtgbbrh1bc.xn--p1ai|medium.com)?(\/)?(@)?([\w\.]+)(\/)?(.+)?$/) !== null) {
    username = username.replace(/^(http:|https:)?(\/\/)?(www.)?(telegram.me|vk.com|twitter.com|github.com|xn--80adtgbbrh1bc.xn--p1ai|medium.com)?(\/)?(@)?([\w\.]+)(\/)?(.+)?$/, '$7');
  } else {
    username = null;
  }

  if (username !== null) {
    response.send('@' + username);
  } else {
    response.send('Invalid username');
  }
});

server.listen(PORT, function () {
  console.log('Server started on port ' + PORT);
});