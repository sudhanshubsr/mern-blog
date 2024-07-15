import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import path from 'path';
import Post from '../model/post.model.js';
import User from '../model/user.model.js';

dotenv.config();

export default class userController {
  static async register(req, res) {
    mongoose.connect(process.env.MONGO_URI);
    const salt = await bcrypt.genSalt(10);
    const { username, email, password } = req.body;
    try {
      // Check if user with same username or email already exists
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: 'User with same username or email already exists' });
      }

      const newUser = await User.create({
        username,
        email,
        password: await bcrypt.hash(password, salt),
      });
      res.status(200).json({ message: 'User created successfully' });
      console.log('User created successfully');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async login(req, res) {
    mongoose.connect(process.env.MONGO_URI);
    const { username, password } = req.body;
    try {
      // CHECK IF USER EXISTS
      const user = await User.findOne({ username });
      console.log(user);
      if (!user) {
        return res.status(400).json({ message: 'Wrong credentials' });
      }

      // CHECK IF PASSWORD IS CORRECT
      const passok = bcrypt.compareSync(password, user.password);

      if (passok) {
        // CREATE TOKEN
        const token = jwt.sign(
          { username, id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: '1d' },
          { algorithm: 'HS256' }
        );
        res.cookie('jwtToken', token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000, // 1 day
          secure: true,
        });

        res.status(200).json({
          id: user._id,
          username: user.username,
          message: 'Logged in successfully',
        });
      } else {
        res.status(400).json({ message: 'Wrong credentials' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async profile(req, res) {
    mongoose.connect(process.env.MONGO_URI);
    try {
      const { jwtToken } = req.cookies;
      if (!jwtToken) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      try {
        const dToken = jwt.verify(jwtToken, process.env.JWT_SECRET);
        res.status(200).json(dToken);
      } catch (err) {
        console.log('JWT Verification error', err);
        res.status(401).json({ message: 'Unauthorized-Invalid JWT' });
      }
    } catch (err) {
      console.log('Error during token verification', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async logout(req, res) {
    mongoose.connect(process.env.MONGO_URI);
    try {
      res.cookie('jwtToken', '', { maxAge: 0, httpOnly: true });
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async createpost(req, res, next) {
    mongoose.connect(process.env.MONGO_URI);

    const { title, summary, content, author } = req.body;
    let imageurl = req.file.location;
    const { jwtToken } = req.cookies;
    if (!jwtToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      jwt.verify(
        jwtToken,
        process.env.JWT_SECRET,
        { algorithm: 'HS256' },
        (err, decodedToken) => {
          if (err) {
            console.log('JWT Verification error', err);
            return res
              .status(401)
              .json({ message: 'Unauthorized-Invalid JWT' });
          }
          const { username, id } = decodedToken;
          const newPost = Post.create({
            title,
            summary,
            content,
            author: id,
            cover: imageurl,
          });
          res.status(200).json({ message: 'Post created successfully' });
        }
      );
    } catch (err) {
      console.log('JWT Verification error', err);
      res.status(401).json({ message: 'Unauthorized-Invalid JWT' });
    }
  }

  static async getposts(req, res) {
    mongoose.connect(process.env.MONGO_URI);
    try {
      const posts = await Post.find()
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
        .limit(20);
      res.status(200).json(posts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
  static async getpostinfo(req, res) {
    mongoose.connect(process.env.MONGO_URI);
    const { id } = req.params;
    try {
      const post = await Post.findById(id).populate('author', ['username']);
      res.status(200).json(post);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async updatepost(req, res) {
    mongoose.connect(process.env.MONGO_URI);

    let imagePath;
    if (req.file) {
      imagePath = req.file.location;
    }
    const { jwtToken } = req.cookies;
    if (!jwtToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      jwt.verify(
        jwtToken,
        process.env.JWT_SECRET,
        { algorithm: 'HS256' },
        async (err, decodedToken) => {
          if (err) {
            console.log('JWT Verification error', err);
            return res
              .status(401)
              .json({ message: 'Unauthorized-Invalid JWT' });
          }
          const { id, title, summary, content } = req.body;

          const postDetails = await Post.findById(id);

          if (!postDetails) {
            return res.status(404).json({ message: 'Post not found' });
          }
          await Post.updateOne(
            { _id: id },
            {
              $set: {
                title,
                summary,
                content,
                cover: imagePath ? imagePath : postDetails.cover,
              },
            }
          );
          res.status(200).json({ message: 'Post updated successfully' });
        }
      );
    } catch (err) {
      console.log('JWT Verification error', err);
      res.status(401).json({ message: 'Unauthorized-Invalid JWT' });
    }
  }
}
