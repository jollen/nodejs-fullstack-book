(function($) {

// WebSocket object
var ws;

$.fn.createWebSocket = function () {    
  // Let us open a web socket
  var ws = new WebSocket('ws://wot.city/object/testman/viewer');

  ws.onopen = function()
  {
    console.log('WebSocket server connected.');
  };

  ws.onclose = function()
  { 
  };

  ws.onerror = function()
  { 
  };

  var onWsMessage = function(message) {
    var data = JSON.parse(message.data);

    console.log(data);
  }

  ws.onmessage = onWsMessage;
};

})($);


$('#message').createWebSocket();