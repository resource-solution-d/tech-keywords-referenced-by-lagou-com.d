require('shelljs/global');
const fs = require('fs');

const resolveTruePromise = new Promise(function (resolve, reject) {
    resolve(true);
});

const ensureCorrectTypeByObject = function () {
    if (!/[object [A-Z][a-z]+/.test(arguments[1])) {
        throw `
        The value arguments[1] got wrong type: ${arguments[1]}, in function checkTypeByObject, defined in ${__filename}.
        It must be the RegExp like '/[object [A-Z][a-z]+/';
        `;
    }
    const objectCheckedType = Object.prototype.toString.call(arguments[0]);
    if (objectCheckedType !== arguments[1]) {
        //[object Array]
        throw `
        The value arguments[0] got wrong type: ${objectCheckedType}, in function checkTypeByObject, defined in ${__filename}.
        It must be ”${arguments[1]}";
        `;
    }
    return arguments[1];
};

const getPageContent = function (pid, pagePath, passOutFn) {
    resolveTruePromise.then(function () {
        exec(
            `curl 'https://www.lagou.com/jobs/${pid}.html' -H 'Pragma: no-cache' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,ja;q=0.2,zh-TW;q=0.2' -H 'Upgrade-Insecure-Requests: 1' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' -H 'Cache-Control: no-cache' -H 'Cookie:...' -H 'Connection: keep-alive' --compressed > ${pagePath}`
        );
    }).then(function () {
        const pageHtmlStr = fs.readFileSync(pagePath);
        passOutFn(pageHtmlStr);
    })
};

module.exports = {
    resolveTruePromise,
    ensureCorrectTypeByObject,
    getPageContent,
};