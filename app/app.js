#!/usr/bin/env nodejs
var http = require('http');
var grpc = require('grpc')

var greets = require('./protos/greet_pb')
var service = require('./protos/greet_grpc_pb')

/* Implements the Greet RPC Service */
function greet (call, callback) {

    var greeting = new greets.GreetResponse()

    greeting.setResult(
        "Hello " + call.request.getGreeting().getFirstName() + 
        " " + call.request.getGreeting().getLastName()
    );

    callback(null, greeting);
}



function main(){

    var server = new grpc.Server()
    
    server.addService(service.GreetServiceService, {greet: greet})    
    server.bind("0.0.0.0:8080", grpc.ServerCredentials.createInsecure());
    server.start()

    console.log("gRPC app server started on 0.0.0.0:50050");
}

main();


http.createServer(function (request, response) {
   response.writeHead(200, {'Content-Type': 'text/plain'});
   response.end('Hello! (app v0015)\n');
}).listen(8888);
console.log('Web Server running at 127.0.0.1:8080');
