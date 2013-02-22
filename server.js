var memcacheHost = '127.0.0.1:11211';
var mongoConnect = "mongodb://localhost:27017/test";

var dgram = require("dgram");
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var Memcached = require('memcached');
var memcacheClient = new Memcached(memcacheHost);

var collection = null;

var connect = MongoClient.connect(mongoConnect, function(err, db) {
        if(!err) { 
            console.log("We are connected"); 
            collection = db.collection('session');
            server.bind(41234);
        } else {
            console.log(err);
            process.kill();
        }
});

var stream = fs.createWriteStream("received.json", { flags: 'w',
    encoding: "utf8",
    mode: 0666 });

var server = dgram.createSocket("udp4");

server.on("message", function (msg, rinfo) {
//    console.log("server got: " + msg + " from "  + rinfo.address + ":" + rinfo.port);
    var data = JSON.parse(msg); 
    var session = collection.findOne({name: data.name}, function(err, result){
        if (!err) {
            if (result) {
                collection.update({name: data.name}, {$set:data}, {w:1}, function(err, result){
                    if (err) {console.log(err);}
                });
            } else {
                collection.insert(data, {w:1}, function(err, result) {
                    if (err) {console.log(err);}
                });
            }
//            memcacheClient.set(data.name, data, 600, function() {});
        }
    });

});

server.on("listening", function () { 
    var address = server.address();
    console.log("server listening " + 
        address.address + ":" + address.port);
});
