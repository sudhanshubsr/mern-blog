import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    summary:{
        type:String,
        required:true,
       
    },
    content:{
        type:String,
        required:true,
       
    },
    cover:{
        type:String,
        required:true,
    },
    
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    },{timestamps:true});

    const PostModel = mongoose.model('Post', PostSchema);   

    export default PostModel;