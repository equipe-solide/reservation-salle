require('module-alias/register');
const path = require('path');
const grpc = require('@grpc/grpc-js'); 
const protoLoader = require('@grpc/proto-loader');
const { RESERVATION_SERVICE_URI } = require('@root/config'); 
const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../protos/reservation.proto'));
const degreeProto = grpc.loadPackageDefinition(packageDefinition);

// const DEGREE = [
//     {
//         id: 100,
//         degreeId: 1000,
//         title: 'Engineering', 
//         major: 'Electronics'
//     }
// ];

function findDegree(call, callback) {
    // let degree = DEGREE.find((degree) => degree.degreeId == call.request.id);
    // if(degree) {
    //     callback(null, degree);
    // }
    // else {
    //     callback({
    //         message: 'Degree not found',
    //         code: grpc.status.INVALID_ARGUMENT
    //     });
    // }
}

const server = new grpc.Server();
// server.addService(degreeProto.Degrees.service, { find: findDegree });

server.bindAsync(RESERVATION_SERVICE_URI, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});