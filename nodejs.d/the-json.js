require('shelljs/global');
const fs = require('fs');
const myUtil = require('./myUtils')
const {
    checkTypeByObject,
} = myUtil;
const miniDependencedOsCmd = [
    'curl'
];
miniDependencedOsCmd.forEach(function (item) {
    if (!which(item)) {
        console.log(`In order to get the json, the dependenced cmd: ${item} is required`);
    }
});

let page = 1;
const promise = new Promise(function (resolve, reject) {
    resolve(true);
});
promise.then(function () {
    exec(
        // "echo 1"
        // "curl https://www.lagou.com/jobs/positionAjax.json?px=default&gx=%E5%85%A8%E8%81%8C&needAddtionalResult=false&isSchoolJob=1' -H 'Cookie: ...' -H 'Origin: https://www.lagou.com' -H 'X-Anit-Forge-Code: 0' -H 'Accept-Language: en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,ja;q=0.2,zh-TW;q=0.2' -H 'X-Requested-With: XMLHttpRequest' -H 'Accept-Encoding: gzip, deflate, br' -H 'Connection: keep-alive' -H 'Pragma: no-cache' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36' -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' -H 'Accept: application/json, text/javascript, */*; q=0.01' -H 'Cache-Control: no-cache' -H 'Referer: https://www.lagou.com/jobs/list_%E5%89%8D%E7%AB%AF?px=default&gx=%E5%85%A8%E8%81%8C&gj=&isSchoolJob=1&city=%E5%85%A8%E5%9B%BD' -H 'X-Anit-Forge-Token: None' --data 'first=false&pn=${page}&kd=%E5%89%8D%E7%AB%AF' --compressed"
        `curl 'https://www.lagou.com/jobs/positionAjax.json?px=default&gx=%E5%85%A8%E8%81%8C&needAddtionalResult=false&isSchoolJob=1' -H 'Cookie: ...' -H 'Origin: https://www.lagou.com' -H 'X-Anit-Forge-Code: 0' -H 'Accept-Language: en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,ja;q=0.2,zh-TW;q=0.2' -H 'X-Requested-With: XMLHttpRequest' -H 'Accept-Encoding: gzip, deflate, br' -H 'Connection: keep-alive' -H 'Pragma: no-cache' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36' -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' -H 'Accept: application/json, text/javascript, */*; q=0.01' -H 'Cache-Control: no-cache' -H 'Referer: https://www.lagou.com/jobs/list_%E5%89%8D%E7%AB%AF?px=default&gx=%E5%85%A8%E8%81%8C&gj=&isSchoolJob=1&city=%E5%85%A8%E5%9B%BD' -H 'X-Anit-Forge-Token: None' --data 'first=false&pn=${page}&kd=%E5%89%8D%E7%AB%AF' --compressed > ./tmp.json`
    );
}).then(function () {
    const str = fs.readFileSync('./tmp.json', 'utf-8');
    // let tryToBeObj = eval(str);
    let tryToBeObj = str;
    // console.log(checkTypeByObject(tryToBeObj));
});
