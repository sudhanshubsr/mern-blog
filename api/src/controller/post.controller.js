import Post from "../model/post.model.js";
import mongoose from "mongoose";
import redis from 'redis'



const client = await redis.createClient() //defaults to port 6379
.on('error', err=> console.log('Redis Client Error', err))
.connect();



export const getAllPosts = async(req,res)=>{
    mongoose.connect(process.env.MONGO_URI);
    try {
      const posts = await Post.find()
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
        .limit(20);
      res.status(200).json(posts);
    } catch (err) {
      console.log(err);
      res.status(500).json({message: "Internal Server Error"});
    }
}


export const createPost = (req,res)=>{

}
export const updatePost = (req,res)=>{

}
export const getPost = async(req,res)=>{
  mongoose.connect(process.env.MONGO_URI);
      const { id } = req.params;
      try {
        // Do we have any cached data in redis related to this query

        const cachedBlogs = await client.get(id);
        if(cachedBlogs){
          console.log('Serving from Cache')
          return res.status(201).json(JSON.parse(cachedBlogs))
        }

        // if yes, then respond to the request right away and return
        // if no, we need to respond to request and update our cache to store the data.
        const post = await Post.findById(id).populate('author', ['username']);
        console.log('Serving From Mongodb')
        res.status(200).json(post);

        //Updating our Cache Server
        await client.set(id, JSON.stringify(post));
      } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
      }
}

// static async createpost(req, res, next) {
//     mongoose.connect(process.env.MONGO_URI);

//     const { title, summary, content, author } = req.body;
//     let imageurl = req.file.location;
//     const { jwtToken } = req.cookies;
//     if (!jwtToken) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//     try {
//       jwt.verify(
//         jwtToken,
//         process.env.JWT_SECRET,
//         { algorithm: 'HS256' },
//         (err, decodedToken) => {
//           if (err) {
//             console.log('JWT Verification error', err);
//             return res
//               .status(401)
//               .json({ message: 'Unauthorized-Invalid JWT' });
//           }
//           const { username, id } = decodedToken;
//           const newPost = Post.create({
//             title,
//             summary,
//             content,
//             author: id,
//             cover: imageurl,
//           });
//           res.status(200).json({ message: 'Post created successfully' });
//         }
//       );
//     } catch (err) {
//       console.log('JWT Verification error', err);
//       res.status(401).json({ message: 'Unauthorized-Invalid JWT' });
//     }
//   }

//   static async getposts(req, res) {
//
//   }
//   static async getpostinfo(req, res) {
//
//   }

//   static async updatepost(req, res) {
//     mongoose.connect(process.env.MONGO_URI);

//     let imagePath;
//     if (req.file) {
//       imagePath = req.file.location;
//     }
//     const { jwtToken } = req.cookies;
//     if (!jwtToken) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//     try {
//       jwt.verify(
//         jwtToken,
//         process.env.JWT_SECRET,
//         { algorithm: 'HS256' },
//         async (err, decodedToken) => {
//           if (err) {
//             console.log('JWT Verification error', err);
//             return res
//               .status(401)
//               .json({ message: 'Unauthorized-Invalid JWT' });
//           }
//           const { id, title, summary, content } = req.body;

//           const postDetails = await Post.findById(id);

//           if (!postDetails) {
//             return res.status(404).json({ message: 'Post not found' });
//           }
//           await Post.updateOne(
//             { _id: id },
//             {
//               $set: {
//                 title,
//                 summary,
//                 content,
//                 cover: imagePath ? imagePath : postDetails.cover,
//               },
//             }
//           );
//           res.status(200).json({ message: 'Post updated successfully' });
//         }
//       );
//     } catch (err) {
//       console.log('JWT Verification error', err);
//       res.status(401).json({ message: 'Unauthorized-Invalid JWT' });
//     }
//   }
//
