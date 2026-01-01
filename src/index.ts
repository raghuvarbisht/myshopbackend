import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/connectDB';
const app = express();

dotenv.config(); // use for env file variable

app.listen(process.env.PORT,()=>{
    connectDB();
    console.log('server running ...');
})