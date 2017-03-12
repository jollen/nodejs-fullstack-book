function start(response) {
    console.log("Handler 'start' is started.");
}

function send(response) {
    console.log("Handler 'send' is started.");
}

exports.start = start;
exports.send = send;
