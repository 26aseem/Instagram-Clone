//Express and Mongoose
require('dotenv').config();

const express = require('express')
const app =express()
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors');



// Models are required
require('./models/user')
require('./models/post')

const mongoose = require('mongoose');

//Database connection is established
mongoose.connect(process.env.DATABASE,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => {
    console.log("DATABASE CONNECTED")
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Routes are required
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))



//Port for listening
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log("Server is running on ", port)
});