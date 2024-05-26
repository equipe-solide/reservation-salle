// Setup grpc client
const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { USER_SERVICE_URI, ROOM_SERVICE_URI, RESERVATION_SERVICE_URI } = require('@root/config');

const userPackageDef = protoLoader.loadSync(path.join(__dirname, '../protos/user.proto'));
const userProto = grpc.loadPackageDefinition(userPackageDef);
const userGrpcClient = new userProto.UserService(USER_SERVICE_URI, grpc.credentials.createInsecure());

const roomPackageDef = protoLoader.loadSync(path.join(__dirname, '../protos/room.proto'));
const roomProto = grpc.loadPackageDefinition(roomPackageDef);
const roomGrpcClient = new roomProto.RoomService(ROOM_SERVICE_URI, grpc.credentials.createInsecure());

const reservationPackageDef = protoLoader.loadSync(path.join(__dirname, '../protos/reservation.proto'));
const reservationProto = grpc.loadPackageDefinition(reservationPackageDef);
const reservationGrpcClient = new reservationProto.ReservationService(RESERVATION_SERVICE_URI, grpc.credentials.createInsecure());

module.exports = { 
    userGrpcClient, 
    roomGrpcClient,
    reservationGrpcClient 
}