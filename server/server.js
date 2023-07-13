//set up boilerplate for server
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/enterpriseDirectory')
const database = mongoose.connection

database.on('error', (err)=> {
    console.log(err);
})

database.once('connected', ()=> {
    console.log('Database Connected');
})

const app = express();
app.use(cors())
app.use('/api', routes)


app.use(express.json);

app.listen(3002, ()=> {
    console.log(`Server started at ${3002}`);
})