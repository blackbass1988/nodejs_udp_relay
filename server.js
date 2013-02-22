


var dgram = require('dgram'),
    nconf = require('nconf'),
    fs = require('fs'),
    MongoClient = require('mongodb').MongoClient,
    Memcached = require('memcached');

nconf.argv()
     .env()
     .file({file: 'config.json'});

var memcacheHost = nconf.get('memcache');
var mongoHost = nconf.get('mongo');
var mongoCollection = nconf.get('collection');
var collection = null;

console.log('~ Session proxy 0.1.0');
console.log("~");
console.log("~");
console.log("~ Mongo host = " + mongoHost);
console.log("~ Memcache host = " + memcacheHost);

var memcacheClient = new Memcached(memcacheHost);
var connect = MongoClient.connect(mongoHost, function(err, db) {
        if(!err) { 
            console.log("~ Mongo connected"); 
            collection = db.collection(mongoCollection);
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
    console.log("server got: " + msg + " from "  + rinfo.address + ":" + rinfo.port);
    var data = JSON.parse(msg); 
    var session = collection.findOne({ses_id: data.ses_id}, function(err, result){
        if (!err) {
            var processor = require('./processor');
            console.log(processor.process(data, result));
            if (result) {
                collection.update({ses_id: data.ses_id}, {$set:data}, {w:1}, function(err, result){
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
    console.log("~ Server listening " + 
        address.address + ":" + address.port);
});
