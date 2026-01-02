import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/connectDB';
import authRoute from './routes/auth'
import { errorHandler } from './middlewares/error';
import cookieParser from 'cookie-parser';
const app = express();

dotenv.config(); // use for env file variable


app.use(express.json());
app.use(errorHandler);
app.use(cookieParser());
app.use('/api/auth', authRoute);

app.listen(process.env.PORT,()=>{
    connectDB();
    console.log('server running ...');
})