import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import db from './config/mongoose.config.js';
import path from 'path';
import userController from './controller/user.controller.js';
import uploadFile from './middlewares/multerS3.middleware.js';

dotenv.config();


const app = express();



app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.urlencoded({extended: true}));

app.use('/uploads',express.static(path.resolve('uploads')));
app.use(express.json());
app.use(cookieParser());

app.post('/api/register', userController.register);
app.post('/api/login', userController.login);
app.get('/api/profile', userController.profile);
app.post('/api/logout', userController.logout);
app.post('/api/createpost',uploadFile.single('file'), userController.createpost);

app.get('/api/posts', userController.getposts);
app.get('/api/post/:id', userController.getpostinfo);
app.put('/api/post/:id', userController.updatepost);
app.put('/api/updatepost', uploadFile.single('file'),userController.updatepost);



app.get('/test', (req, res)=>{
    res.send('Hello World');
})

let Port = process.env.PORT || 3001;
app.listen(Port, ()=>{
    console.log(`Server is running on port ${Port}`);
})

