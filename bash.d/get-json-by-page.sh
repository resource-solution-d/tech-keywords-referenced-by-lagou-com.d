#!/bin/bash
if [[ $foo != *[!0-9]* ]]; then
  page=$1;
  command="curl 'https://www.lagou.com/jobs/positionAjax.json?px=default&gx=%E5%85%A8%E8%81%8C&needAddtionalResult=false&isSchoolJob=1' -H 'Cookie: ...' -H 'Origin: https://www.lagou.com' -H 'X-Anit-Forge-Code: 0' -H 'Accept-Language: en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,ja;q=0.2,zh-TW;q=0.2' -H 'X-Requested-With: XMLHttpRequest' -H 'Accept-Encoding: gzip, deflate, br' -H 'Connection: keep-alive' -H 'Pragma: no-cache' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36' -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' -H 'Accept: application/json, text/javascript, */*; q=0.01' -H 'Cache-Control: no-cache' -H 'Referer: https://www.lagou.com/jobs/list_%E5%89%8D%E7%AB%AF?px=default&gx=%E5%85%A8%E8%81%8C&gj=&isSchoolJob=1&city=%E5%85%A8%E5%9B%BD' -H 'X-Anit-Forge-Token: None' --data 'first=false&pn=${page}&kd=%E5%89%8D%E7%AB%AF' --compressed > ~/tmp.json && prettyj < ~/tmp.json";
  eval $command;
fi;
