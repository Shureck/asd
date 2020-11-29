const http = require("http");
const url = require('url');

http.createServer(function(request, response){
    try {

        const query = url.parse(request.url, true).query;

        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

        response.end(JSON.stringify(getCityCoord(query.name)));
    } catch (e) {
        console.error(e);
    }
}).listen(3000);
