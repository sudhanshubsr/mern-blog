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

app.get('/', (req, res)=>{
    res.send('Hello World');
})

app.use('/', router);

let Port = process.env.PORT || 3001;
app.listen(Port, ()=>{
    console.log(`Server is running on port ${Port}`);
})

