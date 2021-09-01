require('dotenv').config()
const mongoose = require('mongoose')

function connectDB(){

    const url = process.env.MONGO_CONNECTION_URL
    mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true, useFindAndModify: true});
    const connection = mongoose.connection;
    connection.once('open', ()=>{
        console.log(`Nabid database connected on port 5000`);
    }).catch(err =>{
        console.log('Connection failed...')
    });

}

module.exports = connectDB