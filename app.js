const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
cors = require("cors");

const app = express();

const poll = require('./routes/poll');
//set public folder
app.use(express.static(path.join(__dirname, "public")));

// bodyparser middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

//enable cors
app.use(cors());
app.use('/poll', poll)
const port = process.env.PORT || 3000;
const uri = 'mongodb://vande:Vande123@ds113482.mlab.com:13482/pusherpoll'
mongoose.connect(uri, { useNewUrlParser: true });
mongoose.connection.once('open', ()=>{
    app.listen(port, () => console.log('Server started at port 3000'));
})