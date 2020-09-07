#!/usr/bin/env nodejs
var http = require('http');
var grpc = require('grpc')

var greets = require('./protos/greet_pb')
var service = require('./protos/greet_grpc_pb')

const fs = require('fs')



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
    
    let credentials_safe = grpc.ServerCredentials.createSsl(
        fs.readFileSync('../certs/ca.crt'),
        [{
            cert_chain: fs.readFileSync("../certs/server.crt"),
            private_key: fs.readFileSync("../certs/server.key")
        }], true
    )

    let credentials_unsafe = grpc.ServerCredentials.createInsecure();

    server.addService(service.GreetServiceService, {greet: greet})    
    server.bind("service.webshareserver.com:50051", credentials_safe);
    server.start()

    console.log("gRPC app server::: -started on service.webshareserver.com:50051");
}

main();


// http.createServer(function (request, response) {
//    response.writeHead(200, {'Content-Type': 'text/plain'});
//    response.end('Hello! (app v0015)\n');
// }).listen(8080);
// console.log('>Web Server: running at service.webshareserver.com:8080');
