const http = require("http");
const url = require('url');
const data = require('./data.json');

function fix(coord) {
    if(Array.isArray(coord[0])) {
        coord = coord.map(fix);
    } else if (coord.length == 2) {
        coord = coord.reverse();
    } else {
        throw "IDK";
    }

    return coord;
}

function getCityCoord(name) {
    const coordinates = data.find(it => it.name === name).geo.coordinates;
    return coordinates;
    // return fix(coordinates);
}

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
