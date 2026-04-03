import mongoose from "mongoose"

export const connectDB=async ()=>{
    try{
    const conn=await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connection established");
    }
    catch(e){
        console.log(e);
    }
}