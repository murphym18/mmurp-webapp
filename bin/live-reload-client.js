import io from 'socket.io-client';
$(function(){
   var socket = io.connect('http://localhost:8080');
   socket.on('message', function (data) {
     location.reload();
   });
})
