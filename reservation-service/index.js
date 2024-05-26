require('module-alias/register');
const express = require('express');
const cors = require("cors");
const { RESERVATION_SERVICE_URI, REST_API_RESERVATION } = require('@root/config'); 

// gRPC server setup
const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const reservationPackageDef = protoLoader.loadSync(path.join(__dirname, '../protos/reservation.proto'));
const reservationProto = grpc.loadPackageDefinition(reservationPackageDef);

// access data 
const { PrismaClient } = require('@prisma/client');
const { reservations } = new PrismaClient(); 

const server = new grpc.Server();
server.addService(reservationProto.ReservationService.service, { 
    find: async (call, callback) => {
        const { id } = call.request;
        const reservation = await reservations.findFirst({ where: {id: +id} }); 
        if (reservation) callback(null, reservation);
        else callback({ code: grpc.status.NOT_FOUND, details: "Reservation not found"});
    }, 
    findAll: async (call, callback) => {
        const { userId } = call.request;
        const reservations_ = await reservations.findMany({ where: {userId: +userId } }); 
        if (reservations_) callback(null, {reservations: reservations_});
        else callback({ code: grpc.status.NOT_FOUND, details: "Reservation not found"});
    }
});
server.bindAsync(RESERVATION_SERVICE_URI, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log(`User service running @${RESERVATION_SERVICE_URI}`)
});

// Expose to frontend via Rest API
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

app.use('/api/reservation', require('./routes/reservation.route'));
app.use('/api/notification', require('./routes/notification.route'));

const EXPRESS_PORT = 8083;
app.listen(EXPRESS_PORT, () => {
    console.log(`REST API Reservation running @${REST_API_RESERVATION}`);
});