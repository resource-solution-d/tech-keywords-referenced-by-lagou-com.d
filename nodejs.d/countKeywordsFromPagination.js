const fs = require('fs');

const {
    ensureCorrectTypeByObject,
    resolveTruePromiseFn
} = require('./myUtils');

const {
    countAlphabetsFromHtmlTextFn,
} = require('./countAlphabetsFromHtmlText');

const {
    getingPageContent
} = require('./getingPageContent');

const pidWatchAry = [];

function countKeywordsFromPagination(wordsCountObj, sortedWordsCountObjAry, allJsonStr, pidWatchAry) {
    const allAry = JSON.parse(allJsonStr);
// ensureCorrectTypeByObject(allAry, "[object Array]");

    const allPagesObj = allAry[0];
// console.log(JSON.stringify(allPagesObj));

    const resultObjAry = allPagesObj.content.positionResult.result;
    const pidAry = resultObjAry.map(function (result) {
        return result.positionId;
    });
    pidWatchAry.push(pidAry);

    let i = 1;

    //为了较好模拟正常访问，这里设置一个延时, 优化阶段再调整
    let count = 0;
    let timer;

    function delayDownHtml() {
        if (count < pidAry.length) {
            const htmlStrPromise = getingPageContent(pidAry[count]);
            htmlStrPromise.then(function (htmlStr) {
                countAlphabetsFromHtmlTextFn(wordsCountObj, sortedWordsCountObjAry, htmlStr)
            });
            count++;
        } else {
            clearTimeout(timer);
        }
    }

    delayDownHtml();
    timer = setInterval(delayDownHtml, 10000); //10000毫秒下一个职位页
}

module.exports = {
    countKeywordsFromPagination,
};

function test() {
    obj = module.exports.countKeywordsFromPagination({});
    console.log(JSON.stringify(obj));
}
