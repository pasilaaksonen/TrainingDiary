import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/user-routes.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json())
app.use(cors());

app.use('/user', postRoutes);

mongoose
    .connect(process.env.MONGO_DB_LINK, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(5000, () => {
            console.log("Server running on port 5000"); 
        });
    })
    .catch(err => {
        console.log(err);
    });
