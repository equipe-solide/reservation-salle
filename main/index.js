require('module-alias/register')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const { 
    USER_SERVICE_URI, 
    RESERVATION_SERVICE_URI, 
    ROOM_SERVICE_URI,
    REST_API_USER
} = require('@root/config'); 

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// Import and use routes
// app.use('/api/user', require('./routes/user.route')); 
// app.use('/api/room', require('./routes/room.route')); 
// app.use('/api/equipement', require('./routes/equipement.route')); 
// app.use('/api/reservation', require('./routes/reservation.route')); 

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`API is listening on port ${port}`));