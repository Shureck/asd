const fieldMap = require('./src/fieldMap.json');

let i = 1;

console.log(JSON.stringify(fieldMap.map(subIndex => {
  subIndex.indicators = subIndex.indicators.map(indicator => {
    indicator.params = indicator.params.map(param => {
      param.key = i++;
      return param;
    })

    return indicator;
  })

  return subIndex;
})));
