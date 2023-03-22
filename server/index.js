require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser =require('body-parser');
const user = require('./routes/user_aacount.js');

// set up environment
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends:false }));
app.use(cors({
    origin: '*'
}));

app.use('/api/user', user);

// mongo db connect
mongoose.connect(process.env.TEDDITDB_URL)
    .then(() => {
         
    })
    .catch((error) => {
        console.log(error)
    });

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))


