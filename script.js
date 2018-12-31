const fs = require('fs');
const jsonData = fs.readFileSync('temp.json', 'utf8');
const parsedData = JSON.parse(jsonData);

const calculateStartEndDiff = function (data) {
  return data.loc.end.line - data.loc.start.line;
}

const getNoOfParams = function (data) {
  let funcParamsNo = data.init.params.length;
  return funcParamsNo;
}

const funcDetailCreater = function (name, funcLength, funcParamsNo) {
  return { name, funcLength, funcParamsNo };
}

const getFuncDetail = function (data) {
  let name = data.id.name;
  let funcLength = calculateStartEndDiff(data);
  let funcParamsNo = getNoOfParams(data);
  return funcDetailCreater(name, funcLength, funcParamsNo);
}

const isFunction = function (data) {
  return data.init.type == 'FunctionExpression';
}

const addFuncsDetail = function (data) {
  data.funcsDetails = data.map(getFuncDetail);
  return data;
}

const getFuncsDetail = function () {
  let funcData = parsedData.filter(isFunction);
  let data = addFuncsDetail(funcData);
  return data.funcsDetails;
}

console.log(getFuncsDetail());