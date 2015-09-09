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
});


var express = require('express');
var app = express();
var readyToConnect = [];

app.get('/', function(req,res) {
  return res.json({'connected': connected, 'ready': readyToConnect});
});
app.post('/add-device', function(req,res) {
  readyToConnect.push(req.body);
  return res.json({'response': 'added to collection'});
});
app.get('/remove-device', function(req,res) {
  return res.json({'response': 'removed from collection'});
});
app.listen(8080, function() {
  console.log('listening');
});
