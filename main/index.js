const express = require('express');
const bodyParser = require('body-parser'); 
const cors = require("cors"); 

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// User Service Route 
app.use('/api/user', require('./routes/user.route')); 

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`API is listening on port ${port}`));