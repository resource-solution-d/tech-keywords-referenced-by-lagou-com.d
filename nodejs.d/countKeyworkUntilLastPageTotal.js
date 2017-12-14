const request = require('request');

const cheerio = require('cheerio');

// const url = `https://www.lagou.com/jobs/list_%E5%89%8D%E7%AB%AF?labelWords=&fromSearch=true&suginput=`;
const url = `https://www.lagou.com/jobs/list_%E5%89%8D%E7%AB%AF?labelWords=&fromSearch=true&suginput=`;

request(url, function (error, response, body) {
    if(error) throw error;
    if(response && !/^2\d{2}/.test(response.statusCode)){
        throw `Response of request ${url} has been received. But response.statusCode is ${response.statusCode}. This means that no correct data to handle, To fix this issue, you can contact the administrator.`;
    }

    const $ = cheerio.load(body);
    console.log($('.pager_container')[0].innerText);;
    // const $ = cheerio.load(body);
    // // console.log(body);
    // // throw body;
    // console.log($);
    // // const $pager_nextEle = $('.pager_next');
    // // console.log($pager_nextEle.hasClass('.pager_next'));
    // const pager_containerEle = $('pager_container');
    // const pager_containerChildren = pager_containerEle.children();
    // console.log(pager_containerChildren[0].innerHTML);
    // console.log('------------');
    // console.log($('.pager_next ').html());
    // console.log(10);
    // console.log(10);
    // console.log(10);
    // console.log(10);
    // // console.log(JSON.stringify($pager_nextEle));
    // // console.log($pager_nextEle).text();
    // // console.log(Object.prototype.toString.call($pager_nextEle));
    // // console.log($pager_nextEle.class());
    // throw 1;
    // let $lastPagerEle = $pager_nextEle.prev();
    // // throw $lastPagerEle;
    // while(!/^pager_(is|not)_current$/.test($lastPagerEle.prop("className"))){
    //     console.log($lastPagerEle.prop("className"));
    //     $lastPagerEle = $lastPagerEle.prev();
    // }
    // const pageTotal = body.replace(/>
    // 30
    // <\/span><span hidefocus="hidefocus" action="next" class="pager_next ">下一页<strong class="pager_lgthen "><\/strong><\/span><\/div>/, function () {
    //
    // });
    // console.log(pageTotal);
    // console.log('show');
});
// '.pager_container'