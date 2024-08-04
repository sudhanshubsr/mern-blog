import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import {UserModel as User} from '../model/user.model.js';

dotenv.config();

export const register = async (req, res) => {
  mongoose.connect(process.env.MONGO_URI);
  try {
    const { username, email, password } = req.body.user;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User Already Exist' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      return res.status(201).json({ message: 'User created successfully' });
    } else {
      return res.status(400).json({ message: 'Error in Creating User' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const login = async (req, res) => {
  mongoose.connect(process.env.MONGO_URI);
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        'secret',
        { algorithm: 'HS256' }
      );
      res.cookie('jwtToken', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        secure: true,
      });
      return res.status(201).json({ message: 'Login Successful', user: user });
    } else {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const current_user = (req,res)=>{
  mongoose.connect(process.env.MONGO_URI)
  try {
    const {jwtToken} = req.cookies;
    if(!jwtToken){
     return res.send({user: req.user})
    }
    const dToken = jwt.verify(jwtToken, 'secret')
    if(dToken){
      res.status(201).json({token: dToken})
    }else{
      res.status(400).json({message: "Invalid JWT"})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'Internal Server Error'})
  }
}


export const logout = (req,res)=>{
  mongoose.connect(process.env.MONGO_URI)
  try{
    if(req.user){
      req.session.destroy((err)=>{
        if(err){
          console.log('Error destroying session: ', err)
        }
      })
    }
    res.cookie('jwtToken','',{
      expires: new Date(0),
      path: '/'
    })
    return res.status(200).json({message: 'Logged out successfully'})
  }catch(err){
    console.log(err)
    res.status(500).json({message: 'Internal Server Error'})
  }
}


