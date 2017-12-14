const fs = require('fs');
const cheerio = require('cheerio');


const handleWord = function (wordsCountObj, word) {
    if(!(word in wordsCountObj)){
        wordsCountObj[word] = 1;
    } else {
        wordsCountObj[word]++;
    }
};

function countAlphabetsFromHtmlTextFn(wordsCountObj, htmlPath) {
    const htmlStr = fs.readFileSync(htmlPath, 'utf-8');
    const $ = cheerio.load(htmlStr);
    const htmlTextStr = $('body').text();
    htmlTextStr.replace(/([a-zA-Z]\w+)/g, function () {
        handleWord(wordsCountObj, arguments[1]);
    });
};

module.exports = {
    countAlphabetsFromHtmlTextFn,
};

// function test() {
//     const wordsCountObj = {};
//     module.exports.countAlphabetsFromHtmlTextFn('./pages/3581437.html')
//     console.log(JSON.stringify(wordsCountObj));
// }
// test();
