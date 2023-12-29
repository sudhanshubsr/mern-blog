import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MongoURI = process.env.MONGO_URI
mongoose.connect(MongoURI);

const db = mongoose.connection;
db.on('error',console.error.bind(console, 'Error Connecting to DB'));

db.once('open',()=>{
    console.log('Connected to DB');
})


export default db;  