import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRoute from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();

const app = express();




app.use(cors());
app.use(cookieParser());

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((err) => {
        console.log(err);
    });

    app.use(express.json());



    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/listing', listingRoute);


    //  I just create an errorHandling Func. here
    app.use((err, req, res, next) => {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';
        return res.status(statusCode).json({
            success: false,
            statusCode,
            message,
        });
    });
    

app.listen(5000, () => {
    console.log('Server is running on port 5000!');
});