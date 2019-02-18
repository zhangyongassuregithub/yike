<?php
    //通过php可以访问数据,在放回给自己前段
    //phpinfo(); 用来查看自己php版本状态
    //exit();
    //找到php.ini 文件的搜索openssl,在970行把前面的';'去掉就可以了
    // error_reporting(0);//解决报错问题
    // $today=$_GET['today'];
    // $time=time();//时间戳
    // strtotime('-1day',time())//把字符串转成时间，把当前时间戳-1天的时间
    // $today=date('Y-m-d',time())//把时间戳，以第一个参数的格式进行转化


    $url='https://moment.douban.com/api/stream/date/2017-08-16?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';
    $result=file_get_contents($url);
    echo $result;
