const express = require('express');
const app = express();
const PORT = 5000;


app.use(express.json());
app.use(require('./routes/test'));

app.listen(PORT,()=>{
    console.log('Listening on port ', PORT)
})