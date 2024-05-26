require('module-alias/register')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { USER_SERVICE_URI } = require('@root/config'); 
const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../protos/user.proto'));
const user_proto = grpc.loadPackageDefinition(packageDefinition);


const server = new grpc.Server();
// server.addService(user_proto.User.service, {});

server.bindAsync(USER_SERVICE_URI, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
}); 

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

app.use('/api/user', require('./routes/user.route'));

const EXPRESS_PORT = 8081;
app.listen(EXPRESS_PORT, () => {
    console.log(`REST API UserService running @${EXPRESS_PORT}`);
});