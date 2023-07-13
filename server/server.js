//set up boilerplate for server
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
// const mongoString = `mongodb://localhost:27017/swapi`;

mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (err)=> {
    console.log(err);
})

database.once('connected', ()=> {
    console.log('Database Connected');
})

const app = express();
app.use('/api', routes)


app.use(express.json);

app.listen(3002, ()=> {
    console.log(`Server started at ${3002}`);
})