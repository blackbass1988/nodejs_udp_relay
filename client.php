<?php
//{"ses_id":"863f2adc3f2504cfc4fd655933b1e1c8","ip":"95.154.84.146","client_hash":"863f2adc3f2504cfc4fd655933b1e1c8","reg_time":1361776049,"last_time":1361776049,"pages_count":0,"user_data":{"common":1,"http_referer":1},"countTimes":1,"changeTime":1361776049}
$server = "127.0.0.1";
$port = 41234;

while (true) {
    $socket = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP);
    $msg = "foobaristo" . rand(0,1);
    $msg = array('ses_id' => $msg, 'body' => rand(0,1000), 'field2'=>rand());
    $msg = json_encode($msg);
    $len = strlen($msg);
    socket_sendto($socket, $msg, $len, 0, $server, $port);
    socket_close($socket);
    break;
}
