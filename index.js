const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const express = require('express');
const bodyParser = require('body-parser'); 
const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Definition des packages
const packageDefinitionUser = protoLoader.loadSync(path.join(__dirname, '/protos/user.proto'));
const packageDefinitionRes = protoLoader.loadSync(path.join(__dirname, '/protos/reservation.proto'));
const packageDefinitionRoom = protoLoader.loadSync(path.join(__dirname, '/protos/room.proto'));
 
// User Service Route 
app.use('/api/user', require('./routes/user.route')); 

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`API is listening on port ${port}`));

// Chargement des packages
const user_proto = grpc.loadPackageDefinition(packageDefinitionUser);
const res_proto = grpc.loadPackageDefinition(packageDefinitionRes);
const room_proto = grpc.loadPackageDefinition(packageDefinitionRoom);

// Creation du stub
const user_stub = new user_proto.User('0.0.0.0:50051', grpc.credentials.createInsecure());
const res_stub = new res_proto.Reservation('0.0.0.0:50052', grpc.credentials.createInsecure());
const room_stub = new room_proto.Room('0.0.0.0:50053', grpc.credentials.createInsecure());

module.exports = {user_stub, res_stub, room_stub };