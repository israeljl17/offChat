var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

var messages = [];
var filename = 'chat.json';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// viewed at http://localhost:8080

app.use(express.static(__dirname + '/content'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/'));
});

app.listen(3000);

app.post('/sendMessage', function(req, res) {
  read();
  messages.push(req.body);
  save(JSON.stringify(messages));
  res.json(true);
});

app.get('/messages', function(req, res) {
  read();
  //res.writeHead(200, {'Content-Type': 'application/json'});
  res.send(messages);
  //res.json(messages);
});

function save(messagesText) {
  fs.writeFile(filename, messagesText, function(err){
    if(err)
      console.error(err);
  });
}

function read() {
  fs.readFile(filename, 'utf8', function(err, data) {
      if(err) throw err;
      messages = JSON.parse(data);
  });
}
