const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));



let historyArray = [];

function onConnection(socket){

for(let i = 0 ; i < historyArray.length;i ++){
	
	socket.emit("drawing",historyArray[i]);
}
  
  socket.on('drawing', (data) => { 
  	historyArray.push(data);
  	socket.broadcast.emit('drawing', data);
  });
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));