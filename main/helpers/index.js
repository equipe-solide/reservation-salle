const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// // Definition des packages
// const packageDefinitionUser = protoLoader.loadSync(path.join(__dirname, '../../protos/user.proto'));
// const packageDefinitionRes = protoLoader.loadSync(path.join(__dirname, '../../protos/reservation.proto'));
// const packageDefinitionRoom = protoLoader.loadSync(path.join(__dirname, '../../protos/room.proto'));
 

// // Chargement des packages
// const user_proto = grpc.loadPackageDefinition(packageDefinitionUser);
// const res_proto = grpc.loadPackageDefinition(packageDefinitionRes);
// const room_proto = grpc.loadPackageDefinition(packageDefinitionRoom);

// // Creation du stub
// const user_stub = new user_proto.User(process.env.USER_SERVICE, grpc.credentials.createInsecure());
// const res_stub = new res_proto.Reservation(process.env.RESERVATION_SERVICE, grpc.credentials.createInsecure());
// const room_stub = new room_proto.Room(process.env.ROOM_SERVICE, grpc.credentials.createInsecure());

module.exports = {
    // user_stub, 
    // res_stub, 
    // room_stub,
    unset: (obj, properties) => {
        properties.forEach(property => {
            delete obj[property];
        });
    }
}