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
    server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
    server.start()

    console.log("gRPC server started on 127.0.0.1:50051")
}

main();


http.createServer(function (request, response) {
   response.writeHead(200, {'Content-Type': 'text/plain'});
   response.end('Hello back to you--!\n');
}).listen(8080);
console.log('Web Server running at http://127.0.0.1:8080/');
