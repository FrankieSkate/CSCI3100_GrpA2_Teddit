require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
const bodyParser =require('body-parser');
const user = require('./routes/users');
const tweet = require('./routes/tweet')

// set up environment
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends:false }));
app.use(cors({
    origin: '*'
}));

app.use('/api/user', user);
app.use('/api/tweet', tweet);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))


