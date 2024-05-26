require('module-alias/register')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const { USER_SERVICE_URI, REST_API_USER } = require('@root/config');

// gRPC server setup
const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const userPackageDef = protoLoader.loadSync(path.join(__dirname, '../protos/user.proto'));
const userProto = grpc.loadPackageDefinition(userPackageDef);

// access data 
const { PrismaClient } = require('@prisma/client');
const { users } = new PrismaClient(); 
 
const server = new grpc.Server();
server.addService(userProto.UserService.service, { 
    find: async (call, callback) => {
        const { id } = call.request;
        const user = await users.findFirst({ where: {id: +id} }); 
        if (user) callback(null, user);
        else callback({ code: grpc.status.NOT_FOUND, details: "User not found"});
    } 
});
server.bindAsync(USER_SERVICE_URI, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log(`User service running @${USER_SERVICE_URI}`)
});

// Expose to frontend via Rest API
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

app.use('/api/user', require('./routes/user.route'));

const EXPRESS_PORT = 8081;
app.listen(EXPRESS_PORT, () => {
    console.log(`REST API UserService running @${REST_API_USER}`);
});