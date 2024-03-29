const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path")


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;
mongoose.set('strictQuery', true);





app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {})

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})




// create routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/api/exercises', exercisesRouter);
app.use('/api/users', usersRouter);


// createing server production assets
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"..","frontend/build")))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"..","frontend","build"))
    })
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})