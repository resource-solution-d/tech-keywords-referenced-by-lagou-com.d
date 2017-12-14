require('shelljs/global');
const fs = require('fs');
const myUtil = require('./myUtils');

const wordsCountObj = {};

function delayLoopPage0To30(wordsCountObj) {
    //为了较好模拟正常访问，这里设置一个延时, 优化阶段再调整
    let count = 0;
    let timer;

    function delayCountAlphabetsFromPagination() {
        if (count < 30) {
            fs.writeFileSync('../php.d/paginationIndex.php', `
            <?php
$paginationIndex = ${count + 1};
            `);
            //执行php程序生成all.json文件
            exec(`php php.d/the-json.php`);
            count++;

            setTimeout(function () {

            }, 40000); //等待40让php用curl命令下载json,并生成'../php.d/all.json'文件;
        } else {
            clearTimeout(timer);
        }
    }

    delayCountAlphabetsFromPagination();
    timer = setInterval(delayCountAlphabetsFromPagination, 600000); //10分钟开始一个分页爬取, 为了伪装地不那么像爬虫，10分钟爬一个分页, 每个分页15个招聘描述页。
}


// module.exports = {
//     allAry
// };
