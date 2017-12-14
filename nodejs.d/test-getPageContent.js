const myUtils = require('./myUtils');
const {
    resolveTruePromise,
    getPageContent,
} = myUtils;
console.dir(myUtils);
let str;
let pid = 3581437;
resolveTruePromise.then(function () {
    getPageContent(pid, `./pages/${pid}.html`, function (string) {
        str = string;
    });
});
console.log(str);
