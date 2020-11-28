const fieldMap = require('./src/fieldMap.json');

let i = 1;

const cols = [];

fieldMap.forEach(subIndex => {
  subIndex.indicators.forEach(indicator => {
    indicator.params.forEach(param => {
      cols.push([param.key, param.type]);
    })

    return indicator;
  })

  return subIndex;
});

console.log(`
CREATE TABLE data(
    id BIGSERIAL PRIMARY KEY,
    city_id BIGINT REFERENCES city(id),
    profiling_date DATE,
    ${cols.map(it => `c_${it[0]} ${it[1] === 'binary' ? "INT2" : "DOUBLE PRECISION"}`).join(",\n    ")}
);`);
