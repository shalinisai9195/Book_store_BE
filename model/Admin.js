import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username:{
    type:String,
    require:true,
    uniqe:true
  },
  password:{
    type:String,
    require:true,
    
  }
  

})

const adminModel = mongoose.model('admin',adminSchema);

export default adminModel