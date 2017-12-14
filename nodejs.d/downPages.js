const allPages = require('./allAry');
// console.log(JSON.stringify(allPages));

const resultAry = [];
allPages.forEach(function (item) {
    const it = item.content.positionResult.result;
    if(it){
        resultAry.push(it);
    }
});

let i = 1;
const count = resultAry.length;
resultAry.forEach(function(item){
    const page_content = get_page_content();
});
