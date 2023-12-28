import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {type:String, required:true, min:4, unique:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true, min:6},
}, {timestamps:true});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;