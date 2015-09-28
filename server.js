var PeerServer = require('peer').PeerServer;
var server = new PeerServer({port: 9000, path: '/myapp'});
var connected = [];
server.on('connection', function (id) {
  var idx = connected.indexOf(id); // only add id if it's not in the list yet
  if (idx === -1) {connected.push(id);}
});
server.on('disconnect', function (id) {
  var idx = connected.indexOf(id); // only attempt to remove id if it's in the list
  if (idx !== -1) {connected.splice(idx, 1);}

  // loop through everyone in readyToConnect and compare ids.
  for (i=0; i<readyToConnect.length; i++) {
    if (readyToConnect[i].id === id) {
      readyToConnect.splice(i, 1);
    }
  }
});


var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var readyToConnect = [];

var jsonParser = bodyParser.json();

app.use(bodyParser.json());
app.get('/', function(req,res) {
  return res.json({'connected': connected, 'ready': readyToConnect});
});
app.post('/add-device', jsonParser, function(req,res) {
  readyToConnect.push(req.body);
  return res.json({'response': 'added to collection'});
});
app.post('/remove-device', function(req,res) {
  // loop through everyone in readyToConnect and compare ids.
  for (i=0; i<readyToConnect.length; i++) {
    if (readyToConnect[i].id === req.body.id) {
      readyToConnect.splice(i, 1);
    }
  }
  return res.json({'response': 'removed from collection'});
});
app.listen(8080, function() {
  console.log('listening');
});
