const fs = require('fs');
const cmd = require('shelljs');
cmd.exec(`grasp -j var-dec ${process.argv[2]} > temp.json`)
const jsonData = fs.readFileSync('temp.json', 'utf8');

const parsedData = JSON.parse(jsonData);

const calculateStartEndDiff = function (data) {
  return data.loc.end.line - data.loc.start.line;
}

const funcLengthCreater = function (name, funcLength) {
  return { name, funcLength };
}

const getFuncLength = function (data) {
  let name = data.id.name;
  let funcLength = calculateStartEndDiff(data);
  return funcLengthCreater(name, funcLength);
}

const isFunction = function (data) {
  return data.init.type == 'FunctionExpression';
}

const getFuncAndLength = function () {
  let funcsDetails = parsedData.filter(isFunction);
  let funcsLength = funcsDetails.map(getFuncLength);
  return funcsLength;
}

console.log(getFuncAndLength());
cmd.rm('temp.json')