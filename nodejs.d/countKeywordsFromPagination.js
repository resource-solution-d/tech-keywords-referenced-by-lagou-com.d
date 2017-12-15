const fs = require('fs');
const allJsonStr = fs.readFileSync('../php.d/all.json', 'utf-8');
const allAry = JSON.parse(allJsonStr);
// ensureCorrectTypeByObject(allAry, "[object Array]");

const allPagesObj = allAry[0];
console.log(JSON.stringify(allPagesObj));

const {
    ensureCorrectTypeByObject,
    resolveTruePromiseFn
} = require('./myUtils');

const {
    countAlphabetsFromHtmlTextFn,
} = require('./countAlphabetsFromHtmlText');

const {
    getingPageContent
} = require('./getingPageContent')

const resultObjAry = allPagesObj.content.positionResult.result;
const pidAry = resultObjAry.map(function (result) {
    return result.positionId;
});

// throw JSON.stringify(pidAry);

let i = 1;
const count = resultObjAry.length;

function countKeywordsFromPagination(wordsCountObj) {
    //为了较好模拟正常访问，这里设置一个延时, 优化阶段再调整
    let count = 0;
    let timer;
    function delayDownHtml() {
        if (count < pidAry.length) {
            const htmlStrPromise = getingPageContent(pidAry[count]);
            htmlStrPromise.then(function (htmlStr) {
                countAlphabetsFromHtmlTextFn(wordsCountObj, htmlStr)
            });
            count++;
        } else {
            clearTimeout(timer);
        }
    }
    delayDownHtml();
    timer = setInterval(delayDownHtml, 10000);
}

module.exports = {
    countKeywordsFromPagination,
};

function test() {
    obj = module.exports.countKeywordsFromPagination({});
    console.log(JSON.stringify(obj));
}

test();
