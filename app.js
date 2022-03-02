const statik = require('node-static');
const fs = require('fs');

const file = new statik.Server('./dist');

const options = {
    key: process.env.UI_KEY,
    cert: process.env.UI_CERT
};

require('https').createServer(options, function (request, response) {
    request.addListener('end', function() {
        file.serve(request, response);
    }).resume();
}).listen(443);