(function($) {
	var ws;
	var content;

	$.fn.chat = function() {
		ws = new WebSocket('ws://127.0.0.1:8080', 'echo-protocol');

		content = this;

		ws.onopen = function(evt) {
			// [X]: $(".content").html();
			content.html('websocket opened');
		}

		ws.onmessage = function(evt) {
			console.log(evt.data);

			var obj = JSON.parse(evt.data),
				keyPairs = obj.data;

			$('#priceTemplate').tmpl(keyPairs).appendTo('#priceList');
		}

		$('#message').click(function() {
            var content = $("#content").val();

            console.log("Content: " + content);

            var obj = {
            	content: content
            };

            ws.send(JSON.stringify(obj));
		});
	}

}) ($);