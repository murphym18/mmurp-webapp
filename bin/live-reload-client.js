import io from 'socket.io-client';
$(function(){
   var socket = io.connect('http://localhost');
   socket.on('message', function (data) {
     location.reload();
   });
})
