import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import db from './src/config/mongoose.config.js';

import authRouter from './src/routes/auth.routes.js';
import postRouter from './src/routes/post.routes.js';
import userRouter from './src/routes/user.routes.js';

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.resolve('uploads')));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

app.get('/test', (req, res) => {
  res.send('Welcome');
});

let Port = process.env.PORT || 3001;
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
