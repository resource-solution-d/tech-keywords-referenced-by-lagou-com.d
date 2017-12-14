<?php

$data = json_decode( file_get_contents('all.json'), 1 );
$result = [];

foreach( $data as $item )
{
    if( $item['content']['positionResult']['result'] )
        $result = array_merge( $result , $item['content']['positionResult']['result']);
}

$i = 1;
$count = count($result);
foreach( $result as $item )
{
    $page_content = get_page_content( $item['positionId']);
    file_put_contents( 'pages/'.$item['positionId'].'.html' , $page_content );
    echo  $i . "/" . $count . " …… DONE " . " \r\n";
    $i++;
    sleep(1);
}

echo "ALL DONE";

function get_page_content( $pid )
{
    return shell_exec("curl 'https://www.lagou.com/jobs/" . $pid . ".html' -H 'Pragma: no-cache' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,ja;q=0.2,zh-TW;q=0.2' -H 'Upgrade-Insecure-Requests: 1' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36' -H 'Accept: text/html,application/xhtml+xml,ap...

