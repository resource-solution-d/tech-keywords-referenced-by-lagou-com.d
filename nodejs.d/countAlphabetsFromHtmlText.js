const fs = require('fs');
const cheerio = require('cheerio');
const chalk = require('chalk');


const handleWord = function (wordsCountObj, word) {
    word = word.toLowerCase();
    if(word === 'react') word = 'reactjs';
    if(word === 'vue') word = 'vuejs';
    if(word === 'angular') word = 'angularjs';
    if(word === 'js') word = 'javascript';
    if(word === 'css') word = 'css3';
    if(word === 'html') word = 'html5';
    if(!(word in wordsCountObj)){
        wordsCountObj[word] = 1;
    } else {
        wordsCountObj[word]++;
    }
};

function countAlphabetsFromHtmlTextFn(wordsCountObj, sortedWordsCountObjAry, htmlStr) {
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
    sortedWordsCountObjAry = sortedWordsCountAry.map(function (item) {
        return {[item.key]: item.count};
    });
    // console.log(JSON.stringify(sortedWordsCountAry));
    console.log(JSON.stringify(sortedWordsCountObjAry));
    const sortedWordsCountObjAryJsonStr = JSON.stringify(sortedWordsCountObjAry);
    fs.writeFile('./sortedWordsCountObjAry.json', sortedWordsCountObjAryJsonStr, 'utf-8', function (err) {
        if(err){
            throw err;
        }
        console.log(chalk.hex('#0a0').bold('./nodejs.d/sortedWordsCountObjAry.json was updated! if you want to know the numer of current pagination, you can run shell command: " tail -f ../php.d/paginationIndex.php" .'));
    });
};

module.exports = {
    countAlphabetsFromHtmlTextFn,
};

