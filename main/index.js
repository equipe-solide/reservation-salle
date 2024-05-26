
const express = require('express');
require('module-alias/register');
const app = express();
const { REST_API_USER } = require('@root/config');

const EXPRESS_PORT = 8080;
app.listen(EXPRESS_PORT, () => {
    console.log(`REST API UserService running @${REST_API_USER}`);
});