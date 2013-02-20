var dgram = require("dgram");
var mysql = require("mysql");
var connection = mysql.createConnection({
    host:       "localhost",
    user:       "root",
    password:   ""

});

connection.connect();
var fs = require('fs');



var stream = fs.createWriteStream("received.json", { flags: 'w',
    encoding: "utf8",
    mode: 0666 });

var server = dgram.createSocket("udp4");
server.on("message", function (msg, rinfo) {
    console.log("server got: " + msg + " from "  + 
    rinfo.address + ":" + rinfo.port);
    connection.query("insert into test.foo(message) values ('"+msg+"');", function (err, rows, fields){
        if (err) throw err;
        console.log ('row writed');
    })
    //stream.write(msg);
});

server.on("listening", function () { 
    var address = server.address();
    console.log("server listening " + 
        address.address + ":" + address.port);
});

server.bind(41234);
connection.end();
