import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  roll:{
 type:String
  },
  username:{
    type:String,
    require:true,
    uniqe:true
  },
  password:{
    type:String,
    require:true,
    
  },
  grade:{
    type:String
  }
  

})

const studentModel = mongoose.model('student',studentSchema);

export default studentModel;