require('module-alias/register');
const express = require('express');
const cors = require("cors");
const path = require('path');
const { ROOM_SERVICE_URI } = require('@root/config'); 
const grpc = require('@grpc/grpc-js'); 
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../protos/room.proto'));
const degreeProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
// server.addService(degreeProto.Degrees.service, { find: findDegree });

server.bindAsync(ROOM_SERVICE_URI, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

app.use('/api/room', require('./routes/room.route'));
app.use('/api/equipement', require('./routes/equipement.route'));

const EXPRESS_PORT = 8082;
app.listen(EXPRESS_PORT, () => {
    console.log(`REST API RoomService running @${EXPRESS_PORT}`);
});