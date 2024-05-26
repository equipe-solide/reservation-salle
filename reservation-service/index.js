require('module-alias/register');
const express = require('express');
const cors = require("cors");
const { RESERVATION_SERVICE_URI, REST_API_RESERVATION } = require('@root/config'); 

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