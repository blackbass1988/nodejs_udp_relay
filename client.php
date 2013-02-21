<?php
$server = "127.0.0.1";
$port = 41234;

while (true) {
    $socket = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP);
    $msg = "foobaristo" . rand(0,1);
    $msg = array('name' => $msg, 'body' => rand(0,1000), 'field2'=>rand());
    $msg = json_encode($msg);
    $len = strlen($msg);
    socket_sendto($socket, $msg, $len, 0, $server, $port);
    socket_close($socket);
}
