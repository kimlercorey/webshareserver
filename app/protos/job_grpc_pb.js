// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var protos_job_pb = require('../protos/job_pb.js');

function serialize_job_CreateJobRequest(arg) {
  if (!(arg instanceof protos_job_pb.CreateJobRequest)) {
    throw new Error('Expected argument of type job.CreateJobRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_job_CreateJobRequest(buffer_arg) {
  return protos_job_pb.CreateJobRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_job_CreateJobResponse(arg) {
  if (!(arg instanceof protos_job_pb.CreateJobResponse)) {
    throw new Error('Expected argument of type job.CreateJobResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_job_CreateJobResponse(buffer_arg) {
  return protos_job_pb.CreateJobResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_job_DeleteJobRequest(arg) {
  if (!(arg instanceof protos_job_pb.DeleteJobRequest)) {
    throw new Error('Expected argument of type job.DeleteJobRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_job_DeleteJobRequest(buffer_arg) {
  return protos_job_pb.DeleteJobRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_job_DeleteJobResponse(arg) {
  if (!(arg instanceof protos_job_pb.DeleteJobResponse)) {
    throw new Error('Expected argument of type job.DeleteJobResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_job_DeleteJobResponse(buffer_arg) {
  return protos_job_pb.DeleteJobResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_job_GetJobRequest(arg) {
  if (!(arg instanceof protos_job_pb.GetJobRequest)) {
    throw new Error('Expected argument of type job.GetJobRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_job_GetJobRequest(buffer_arg) {
  return protos_job_pb.GetJobRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_job_GetJobResponse(arg) {
  if (!(arg instanceof protos_job_pb.GetJobResponse)) {
    throw new Error('Expected argument of type job.GetJobResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_job_GetJobResponse(buffer_arg) {
  return protos_job_pb.GetJobResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_job_ListJobRequest(arg) {
  if (!(arg instanceof protos_job_pb.ListJobRequest)) {
    throw new Error('Expected argument of type job.ListJobRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_job_ListJobRequest(buffer_arg) {
  return protos_job_pb.ListJobRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_job_ListJobResponse(arg) {
  if (!(arg instanceof protos_job_pb.ListJobResponse)) {
    throw new Error('Expected argument of type job.ListJobResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_job_ListJobResponse(buffer_arg) {
  return protos_job_pb.ListJobResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_job_UpdateJobRequest(arg) {
  if (!(arg instanceof protos_job_pb.UpdateJobRequest)) {
    throw new Error('Expected argument of type job.UpdateJobRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_job_UpdateJobRequest(buffer_arg) {
  return protos_job_pb.UpdateJobRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_job_UpdateJobResponse(arg) {
  if (!(arg instanceof protos_job_pb.UpdateJobResponse)) {
    throw new Error('Expected argument of type job.UpdateJobResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_job_UpdateJobResponse(buffer_arg) {
  return protos_job_pb.UpdateJobResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var JobServiceService = exports.JobServiceService = {
  // Service APIS for Jobs   
deleteJob: {
    path: '/job.JobService/DeleteJob',
    requestStream: false,
    responseStream: false,
    requestType: protos_job_pb.DeleteJobRequest,
    responseType: protos_job_pb.DeleteJobResponse,
    requestSerialize: serialize_job_DeleteJobRequest,
    requestDeserialize: deserialize_job_DeleteJobRequest,
    responseSerialize: serialize_job_DeleteJobResponse,
    responseDeserialize: deserialize_job_DeleteJobResponse,
  },
  updateJob: {
    path: '/job.JobService/UpdateJob',
    requestStream: false,
    responseStream: false,
    requestType: protos_job_pb.UpdateJobRequest,
    responseType: protos_job_pb.UpdateJobResponse,
    requestSerialize: serialize_job_UpdateJobRequest,
    requestDeserialize: deserialize_job_UpdateJobRequest,
    responseSerialize: serialize_job_UpdateJobResponse,
    responseDeserialize: deserialize_job_UpdateJobResponse,
  },
  getJob: {
    path: '/job.JobService/GetJob',
    requestStream: false,
    responseStream: false,
    requestType: protos_job_pb.GetJobRequest,
    responseType: protos_job_pb.GetJobResponse,
    requestSerialize: serialize_job_GetJobRequest,
    requestDeserialize: deserialize_job_GetJobRequest,
    responseSerialize: serialize_job_GetJobResponse,
    responseDeserialize: deserialize_job_GetJobResponse,
  },
  createJob: {
    path: '/job.JobService/CreateJob',
    requestStream: false,
    responseStream: false,
    requestType: protos_job_pb.CreateJobRequest,
    responseType: protos_job_pb.CreateJobResponse,
    requestSerialize: serialize_job_CreateJobRequest,
    requestDeserialize: deserialize_job_CreateJobRequest,
    responseSerialize: serialize_job_CreateJobResponse,
    responseDeserialize: deserialize_job_CreateJobResponse,
  },
  listJob: {
    path: '/job.JobService/ListJob',
    requestStream: false,
    responseStream: true,
    requestType: protos_job_pb.ListJobRequest,
    responseType: protos_job_pb.ListJobResponse,
    requestSerialize: serialize_job_ListJobRequest,
    requestDeserialize: deserialize_job_ListJobRequest,
    responseSerialize: serialize_job_ListJobResponse,
    responseDeserialize: deserialize_job_ListJobResponse,
  },
};

exports.JobServiceClient = grpc.makeGenericClientConstructor(JobServiceService);
