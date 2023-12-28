import mongoose from "mongoose";

mongoose.connect("mongodb+srv://pulseofmeblog:Ga1hCoskxsjxhPj4@cluster0.dnyzshb.mongodb.net/pulseofmeblog?retryWrites=true&w=majority");


const db = mongoose.connection;
db.on('error',console.error.bind(console, 'Error Connecting to DB'));

db.once('open',()=>{
    console.log('Connected to DB');
})


export default db;  