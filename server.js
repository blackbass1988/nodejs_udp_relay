var dgram = require("dgram");
var fs = require('fs');

var stream = fs.createWriteStream("received.json", { flags: 'w',
    encoding: "utf8",
    mode: 0666 });

var server = dgram.createSocket("udp4");
server.on("message", function (msg, rinfo) {
    console.log("server got: " + msg + " from "  + 
    rinfo.address + ":" + rinfo.port);
    //stream.write(msg);
});

server.on("listening", function () { 
    var address = server.address();
    console.log("server listening " + 
        address.address + ":" + address.port);
});

server.bind(41234);

