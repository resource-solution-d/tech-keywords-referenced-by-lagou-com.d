const fs = require('fs');
const myUtil = require('./myUtils');
const {
    ensureCorrectTypeByObject,
} = myUtil;

const allJsonStr = fs.readFileSync('../php.d/all.json', 'utf-8');
const allAry = JSON.parse(allJsonStr);
ensureCorrectTypeByObject(allAry, "[object Array]");
module.exports = {
    allAry
};
