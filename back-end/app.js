import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/user-routes.js';
import middlewares from './middlewares/middlewares.js'
import config from './utils/config.js'

const app = express();

app.use(middlewares.tokenExtractor)
app.use(middlewares.userExtractor)
app.use(express.json())
app.use(cors());
app.use('/user', postRoutes);

mongoose
    .connect(config.MONGO_DB_LINK, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(3001, () => {
            console.log("Server running on port 3001"); 
        });
    })
    .catch(err => {
        console.log(err);
    });
