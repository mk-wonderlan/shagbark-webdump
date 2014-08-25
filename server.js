var express = require('express');
var bodyParser = require('body-parser')
var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);

app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
// development only

app.get('/', function(req, res){
  res.render('index.html');
});

app.post('/ircmessage',function(req, res)
{
  console.log(req.body);
   io.emit('chat message', req.body.message);
   res.writeHead(200);
    res.end();
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
