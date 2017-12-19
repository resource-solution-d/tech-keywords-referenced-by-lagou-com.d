const myUtils = require('./myUtils');
const fs = require('fs');
const {
    resolveTruePromiseFn,
    downPageContentByPid,
} = myUtils;
console.dir(myUtils);
let str;
// let testPid = 3581437;

function getingPageContent(pid) {
    console.log(`if you can see this line, the then pid in ${__filename} has been passed in.`);
    let pagePath = `./pages/${pid}.html`;
    return new Promise(function (resolve, reject) {
        resolveTruePromiseFn().then(function () {
            console.log(`if you can see this line, the then block of resolveTruePromiseFn in ${__filename} has been executed.`);
            downPageContentByPid(pid, pagePath)
                .then(function () {
                    str = fs.readFileSync(pagePath, 'utf-8');
                    console.log(str);
                    resolve(str);
                    // resolve pathPath, compatible for other file.
                    // resolve(pagePath);
                });
        });
    })
};

module.exports = {
    getingPageContent,
};
