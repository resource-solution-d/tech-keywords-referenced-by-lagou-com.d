require('shelljs/global');
const fs = require('fs');
const {
    resolveTruePromiseFn,
    ensureCorrectTypeByObject,
    downPageContentByPid,
} = require('./myUtils');
const {
    countKeywordsFromPagination
} = require('./countKeywordsFromPagination');

const wordsCountObj = {};
const pidWatchAry = [];

function delayLoopPage0To30(wordsCountObj) {
    //为了较好模拟正常访问，这里设置一个延时, 优化阶段再调整
    let count = 0;
    let timer;

    // let paginationCount = 0;

    function delayCountAlphabetsFromPagination() {
        if (count < 30) {

            let allJsonMtime = 'unstart';

            let waitNewAllJsonTimer = setInterval(function () {
                var fs = require('fs');
                var statInfo = fs.statSync('../php.d/all.json');
                // console.log(statInfo);
                if (allJsonMtime === 'unstart' || allJsonMtime < statInfo.mtimeMs) {
                    const allJsonStr = fs.readFileSync('../php.d/all.json', 'utf-8');
                    countKeywordsFromPagination(wordsCountObj, allJsonStr, pidWatchAry);
                    clearInterval(waitNewAllJsonTimer);
                }
                allJsonMtime = statInfo.mtimeMs;
            }, 5000); //等待10秒让php用curl命令下载json,并生成'../php.d/all.json'文件,不然countKeywordsFromPagination中读all.json会读到跟上一次一样的json string.;

            fs.writeFileSync('../php.d/paginationIndex.php', `<?php
$paginationIndex = ${count + 1};
            `);
            //执行php程序生成all.json文件
            exec(`php ../php.d/the-json.php`);
            count++;


            // if (count === 2) {
            //     console.log(`the watchPidAry is look like ${JSON.stringify(pidWatchAry)}, right?`);
            //     throw 123;
            // }
        } else {
            console.log(`
DONE! Pagination ${count} has been handle completed!
            `);
            clearTimeout(timer);
        }
    }

    delayCountAlphabetsFromPagination();
    timer = setInterval(delayCountAlphabetsFromPagination, 60000); //1分钟开始一个分页爬取, 为了伪装地不那么像爬虫，10分钟爬一个分页, 每个分页15个招聘描述页。
}

delayLoopPage0To30(wordsCountObj);

// module.exports = {
//     allAry
// };
