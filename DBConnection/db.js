import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


const URL = process.env.MONGO_URL

const Dbconnect = async()=>{
    try {
      
      let connectres = await mongoose.connect(URL)
      console.log('DB connected successfully!')
      return connectres;

    } catch (error) {
      console.log('error in DB connect')
    }

}
export default Dbconnect;