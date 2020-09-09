#!/usr/bin/env nodejs
var http = require('http');
var grpc = require('grpc')

// Greetings 
var greets = require('./protos/greet_pb')
var service = require('./protos/greet_grpc_pb')

// JobService
var jobs = require('./protos/job_pb')
var jobService = require('./protos/job_grpc_pb')


const fs = require('fs')

// knex requirements
const environment = process.env.ENVIRONMENT || "development"
const config = require('../knexfile')[environment]
const knex = require('knex')(config)


/* Implement the createJob server capabilities **/
function deleteJob(call, callback){
  
    var jobId = call.request.getId()
  
    console.log ('Received request to DELETE job ', jobId )
    
    knex("jobs")
      .where({id: parseInt(jobId)})
      .delete()
      .returning()
      .then(data => {
        console.log('Deleting record ', jobId)

        if(data){
            var deleteResponse = new jobs.DeleteJobResponse()

            deleteResponse.setId(jobId)
            console.log('Deleted record ', deleteResponse.toString())

            callback(null, deleteResponse)

        } else {

            console.log('Could not Delete record ', jobId)

            return callback({
                code: grpc.status.NOT_FOUND,
                message: "job " + jobId  + " does not exist in the job queue to remove." 
            })

        }


      })


}



/* Implement the updateJob server capabilities **/
function updateJob(call, callback){

    console.log ('Received request to UPDATE job...')

    var jobId = call.request.getJob().getId()

    console.log('searching for job to update...')
    
    knex("jobs")
    .where({id: parseInt(jobId)})
    .update({
        type: call.request.getJob().getType(),
        request: call.request.getJob().getRequest(),
        //timeRequested: call.request.getJob().getTimerequested(),
        maxRetries: call.request.getJob().getMaxretries(),
        response: call.request.getJob().getResponse(),
        //timeStarted: call.request.getJob().getTimestarted(),
        //timeComplete: call.request.getJob().getTimecomplete(),
        currentRetryCount: call.request.getJob().getCurrentretrycount(),
        status: call.request.getJob().getStatus()

    })
    .returning()
    .then(data => { 
        if (data) {
            var job = new jobs.Job()

            console.log('Job found sending message...')

            // set the job response
            
            job.setId(jobId)
            
            job.setType(data.type)
            job.setRequest(data.request)
            //job.setTimerequested(data.timeRequested)
            job.setMaxretries(data.maxRetries)
            job.setResponse(data.response)
            //job.setTimestarted(data.timeStarted)
            //job.setTimecomplete(data.timeComplete)
            job.setCurrentretrycount(data.currentRetryCount)
            job.setStatus(data.status)

            var updateJobResponse = new jobs.UpdateJobResponse();

            updateJobResponse.setJob(job);

            console.log("Updated===", updateJobResponse.getJob().getId());

            callback(null, updateJobResponse)
        }
    })

}


/* Implement the createJob server capabilities **/
function getJob(call, callback){

  console.log ('Received request to get job...')

  var jobId = call.request.getId()

  knex("jobs")
    .where({id: parseInt(jobId)})
    .then(data => {
        console.log('Searching for record with id ', jobId)

        if (data.length){
            var job = new jobs.Job()

            console.log('found data ...')

            job.setId(jobId)
            
            job.setType(data[0].type)
            job.setRequest(data[0].request)
            //job.setTimerequested(data[0].timeRequested)
            
            job.setMaxretries(data[0].maxRetries)
            job.setResponse(data[0].response)
            //job.setTimestarted(data[0].timeStarted)
            //job.setTimecomplete(data[0].timeComplete)
            job.setCurrentretrycount(data[0].currentRetryCount)
            job.setStatus(data[0].status)

            var jobResponse = new jobs.GetJobResponse();

            jobResponse.setJob(job);
            callback(null, jobResponse)

        } else {
            console.log ("Job ID not found")
            return callback({
                code: grpc.status.NOT_FOUND,
                message: "job " + jobId  + " does not exist in the job queue." 
            })
        }
    })

    

}

/* Implement the createJob server capabilities **/
function createJob(call, callback){

    console.log ('Received request to create job...')
    var job = call.request.getJob()

    console.log ('Insert job...')
    knex("jobs")
        .insert({
            type: job.getType(),
            request: job.getRequest(),
            //timeRequested: job.getTimerequested(),
            maxRetries: job.getMaxretries(),
            response: job.getResponse(),
            //timeStarted: job.getTimestarted(),
            //timeComplete: job.getTimecomplete(),
            currentRetryCount: job.getCurrentretrycount(),
            status: job.getStatus()

        }).then( () => {
            var id = job.getId()

            var addedJob = new jobs.Job()

            addedJob.setId(id)
            addedJob.setType(job.getType())
            addedJob.setRequest(job.getRequest())
            //addedJob.setTimerequested(job.getTimerequested())
            
            addedJob.setMaxretries(job.getMaxretries())
            addedJob.setResponse(job.getResponse())
            //addedJob.setTimestarted(job.getTimestarted())
            //addedJob.setTimecomplete(job.getTimecomplete())
            addedJob.setCurrentretrycount(job.getCurrentretrycount())
            addedJob.setStatus(job.getStatus())

            var jobResponse = new jobs.CreateJobResponse();
            
            jobResponse.setJob(addedJob);

            console.log('Inserted job with ID: ', id);

            callback(null,jobResponse)

        })


}



/* Implement the listJob server capabilities **/
function listJob(call, callback){

    console.log('Received request for list of Jobs...')

    knex("jobs").then(data => {
        data.forEach(element => {
            
            //console.log("i see id: " , element.id);

            var job = new jobs.Job()

            job.setId(element.id)
            job.setType(element.type)
            job.setRequest(element.request)
            job.setTimerequested(element.timeRequested)
            
            job.setMaxretries(element.maxRetries)
            job.setResponse(element.response)
            job.setTimestarted(element.timeStarted)
            job.setTimecomplete(element.timeComplete)
            job.setCurrentretrycount(element.currentRetryCount)
            job.setStatus(element.status)
                
            //console.log('ID SET AS ', job.getId())
            //console.log('Jobs ', job.toString());

            var jobResponse = new jobs.ListJobResponse()
            
            jobResponse.setJob(job)

            console.log('jobResponse ', jobResponse.toString());

            call.write(jobResponse)
        });
        call.end() //done sending jobs
    })

}

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
    server.addService(jobService.JobServiceService, {
        listJob: listJob, 
        createJob: createJob, 
        getJob: getJob, 
        updateJob: updateJob,
        deleteJob: deleteJob })
    


    server.bind("0.0.0.0:50051", credentials_safe);
    server.start()

    console.log("gRPC app server (v028) started on service.webshareserver.com:50051");
}

main();


