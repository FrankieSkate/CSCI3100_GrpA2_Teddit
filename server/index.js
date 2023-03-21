require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser =require('body-parser');
const user = require('./routes/user.js');

// set up environment
const app = express();

// mongo db connect
mongoose.connect(process.env.TEDDITDB_URL);

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends:false }));
app.use(cors({
    origin: '*'
}));

app.use('/api/user', user);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))


