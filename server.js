var dgram = require("dgram");
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

 
var saveData = function(data) {
    MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
        if(!err) { console.log("We are connected"); }   
        var collection = db.collection('test');
        var doc1 = {'data' : data};
        collection.insert(doc1, function(err, result) {
            
        });
    });
}

var stream = fs.createWriteStream("received.json", { flags: 'w',
    encoding: "utf8",
    mode: 0666 });

var server = dgram.createSocket("udp4");
server.on("message", function (msg, rinfo) {
    console.log("server got: " + msg + " from "  + 
    rinfo.address + ":" + rinfo.port);
    saveData(msg);
    //stream.write(msg);
});

server.on("listening", function () { 
    var address = server.address();
    console.log("server listening " + 
        address.address + ":" + address.port);
});

server.bind(41234);
