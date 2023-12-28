import express from 'express';
import router from './routes/index.router.js';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import db from './config/mongoose.config.js';
import path from 'path';

dotenv.config();

const app = express();


app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.urlencoded({extended: true}));

app.use('/uploads',express.static(path.resolve('uploads')));
app.use(express.json());
app.use(cookieParser());


app.use('/api', router);

app.listen(3001, ()=>{
    console.log('Server is listening on port 3001');
})

