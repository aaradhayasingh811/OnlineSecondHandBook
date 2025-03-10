import mongoose from 'mongoose';

export const connection = async()=>{
    try{
        mongoose.connect(`${process.env.MONGODB_URI}/NovelNest`).then(()=>{
            console.log('Connected to MongoDB');
        })
        .catch((err)=>{
            console.log('Error connecting to MongoDB:', err);
        })
    }
    catch(err){
        console.log("cant connect");
    }
}

