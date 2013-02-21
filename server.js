var dgram = require("dgram");
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var collection = null;

var connect = MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
        if(!err) { console.log("We are connected"); }   
        collection = db.collection('test');
});



var stream = fs.createWriteStream("received.json", { flags: 'w',
    encoding: "utf8",
    mode: 0666 });

var server = dgram.createSocket("udp4");
server.on("message", function (msg, rinfo) {
    console.log("server got: " + msg + " from "  + 
    rinfo.address + ":" + rinfo.port);
    console.info(collection);
    collection.insert({data: msg}, function(err, result) {
        if (!err) {console.log(err);}
    });
    //stream.write(msg);
});

server.on("listening", function () { 
    var address = server.address();
    console.log("server listening " + 
        address.address + ":" + address.port);
});

server.bind(41234);
