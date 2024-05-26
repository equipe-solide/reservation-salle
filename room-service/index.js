require('module-alias/register');
const express = require('express');
const cors = require("cors");
const { ROOM_SERVICE_URI, REST_API_ROOM } = require('@root/config'); 

// gRPC server setup
const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const roomPackageDef = protoLoader.loadSync(path.join(__dirname, '../protos/room.proto'));
const roomProto = grpc.loadPackageDefinition(roomPackageDef);

// access data 
const { PrismaClient } = require('@prisma/client');
const { rooms, equipements } = new PrismaClient(); 

const server = new grpc.Server();
server.addService(roomProto.RoomService.service, { 
    find: async (call, callback) => {
        const { id } = call.request;
        const room = await rooms.findFirst({ 
            where: {id: +id}, 
            include: {equipements: true}
        }); 
        if (room) callback(null, room);
        else callback({ code: grpc.status.NOT_FOUND, details: "room not found"});
    } 
});
server.bindAsync(ROOM_SERVICE_URI, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log(`Room service running @${ROOM_SERVICE_URI}`)
});

// Expose to frontend via Rest API
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

app.use('/api/room', require('./routes/room.route'));
app.use('/api/equipement', require('./routes/equipement.route'));

const EXPRESS_PORT = 8082;
app.listen(EXPRESS_PORT, () => {
    console.log(`REST API RoomService running @${REST_API_ROOM}`);
});