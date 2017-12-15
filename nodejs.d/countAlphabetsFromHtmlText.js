const fs = require('fs');
const cheerio = require('cheerio');


const handleWord = function (wordsCountObj, word) {
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
    console.log(JSON.stringify(wordsCountObj));
};

module.exports = {
    countAlphabetsFromHtmlTextFn,
};

