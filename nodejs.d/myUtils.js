require('shelljs/global');
const fs = require('fs');

function resolveTruePromiseFn() {
    return new Promise(function (resolve, reject) {
        resolve(true);
    });
}

const ensureCorrectTypeByObject = function (subject, objectType, callback) {
    callback = callback = ()=>{};
    if (!/[object [A-Z][a-z]+/.test(objectType)) {
        throw `
        The value arguments[1] got wrong type: ${objectType}, in function checkTypeByObject, defined in ${__filename}.
        It must be the RegExp like '/[object [A-Z][a-z]+/';
        `;
    }
    const objectCheckedType = Object.prototype.toString.call(subject);
    const testBool = objectCheckedType !== objectType;
    if (testBool) {
        //[object Array]
        throw `
        The value arguments[0] got wrong type: ${objectCheckedType}, in function checkTypeByObject, defined in ${__filename}.
        It must be ”${objectType}";
        `;
    }
    callback(testBool);
    return objectType;
};

const downPageContentByPid = function (pid, pagePath) {
    return resolveTruePromiseFn().then(function () {
        exec(
            `curl 'https://www.lagou.com/jobs/${pid}.html' -H 'Pragma: no-cache' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,ja;q=0.2,zh-TW;q=0.2' -H 'Upgrade-Insecure-Requests: 1' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' -H 'Cache-Control: no-cache' -H 'Cookie:...' -H 'Connection: keep-alive' --compressed > ${pagePath}`
        );
    }).then(function () {
        console.log(`${pagePath} has been write completed :-)`);
    })
};

module.exports = {
    resolveTruePromiseFn,
    ensureCorrectTypeByObject,
    downPageContentByPid,
};