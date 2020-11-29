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

data.forEach(it => {
    if (it.name == process.argv[2]) {
        console.log(JSON.stringify(fix(it.geo.coordinates)));
    }
})
