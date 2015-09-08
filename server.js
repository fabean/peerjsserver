// var PeerServer = require('peer').PeerServer;
// var server = new PeerServer({port: 9000, path: '/myapp'});
// var connected = [];
// server.on('connection', function (id) {
//   var idx = connected.indexOf(id); // only add id if it's not in the list yet
//   if (idx === -1) {connected.push(id);}
// });
// server.on('disconnect', function (id) {
//   var idx = connected.indexOf(id); // only attempt to remove id if it's in the list
//   if (idx !== -1) {connected.splice(idx, 1);}
// });

var connected = ['hi'];
var express = require('express');
var app = express();

app.get('*', function(req,res) {
        return res.json(connected);
});
app.listen(8080, function() {
  console.log('listening');
});
