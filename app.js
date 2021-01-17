const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');

const {MONGURL} = require('./keys/keys')

require('./models/users')

mongoose.connect(MONGURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected",()=>{
    console.log('Succesfully connectev')
})

mongoose.connection.on("error",(e)=>{
    console.log("Error: ",e)
})
app.use(express.json());
app.use(require('./routes/auth'));

app.listen(PORT,()=>{
    console.log('Listening on port ', PORT)
})