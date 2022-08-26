const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./Routes/Route')

const app = express();
const PORT = process.env.PORT || 8001;
const mongoURL = "mongodb+srv://admin:admin@cluster0.ui8ubi9.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json())
app.use(cors())

mongoose.connect(mongoURL,{
    useNewUrlParser:true
}).then(res=>{
    console.log("connection status : ",mongoose.connection.readyState)
}).catch(err=>{
    console.log(err)
})


app.get('/api',(req,res)=>{
    res.status(200).send("welcome to note app");
})

app.use('/api/notes',router)


app.listen(PORT,()=>console.log("Server Online!"))