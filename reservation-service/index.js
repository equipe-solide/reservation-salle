require('module-alias/register');
const express = require('express');
const cors = require("cors");
const path = require('path');
const grpc = require('@grpc/grpc-js'); 
const protoLoader = require('@grpc/proto-loader');
const { RESERVATION_SERVICE_URI, REST_API_RESERVATION } = require('@root/config'); 
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
    console.log(`Reservation service running @${RESERVATION_SERVICE_URI}`)
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

app.use('/api/reservation', require('./routes/reservation.route'));
app.use('/api/notification', require('./routes/notification.route'));

const EXPRESS_PORT = 8083;
app.listen(EXPRESS_PORT, () => {
    console.log(`REST API RoomService running @${REST_API_RESERVATION}`);
});