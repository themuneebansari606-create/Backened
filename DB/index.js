import mongoose from 'mongoose';
import momgoose from 'mongoose'
import { configDotenv } from 'dotenv';
configDotenv()
const connectDB =async()=>{
    try{
const connection = await mongoose.connect(process.env.mongodb_URL)
console.log("mongodb connected");

    }catch(error){
        console.log(error.message);
        
    }
}
export  default connectDB