const fs = require('fs');
const cheerio = require('cheerio');


const handleWord = function (wordsCountObj, word) {
    word = word.toLowerCase();
    if(!(word in wordsCountObj)){
        wordsCountObj[word] = 1;
    } else {
        wordsCountObj[word]++;
    }
};

function countAlphabetsFromHtmlTextFn(wordsCountObj, htmlStr) {
    // const htmlStr = fs.readFileSync(htmlPath, 'utf-8');
    const $ = cheerio.load(htmlStr);
    const htmlTextStr = $('body').text();
    htmlTextStr.replace(/([a-zA-Z]\w+)/g, function () {
        handleWord(wordsCountObj, arguments[1]);
    });
    const wordsCountAry = [];
    for(let key in wordsCountObj){
        wordsCountAry.push({
            key: key,
            count: wordsCountObj[key],
        });
    }
    const sortedWordsCountAry = wordsCountAry.sort(function (a, b) {
        return b.count - a.count;
    });
    const sortedWordsCountObjAry = sortedWordsCountAry.map(function (item) {
        return {[item.key]: item.count};
    });
    // console.log(JSON.stringify(sortedWordsCountAry));
    console.log(JSON.stringify(sortedWordsCountObjAry));
};

module.exports = {
    countAlphabetsFromHtmlTextFn,
};

