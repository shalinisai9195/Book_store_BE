import studentModel from "../model/Student.js";
import bcrypt from 'bcrypt';



export const register = async(req,res)=>{
  try {
     const{roll,username,password,grade} = req.body;

     let student = await studentModel.findOne({username})

     if(student){
      return res.status(404).json({message:'student alredy registered'})
     }

     let hasPwd = bcrypt.hashSync(password,10)

     let newStudent = new studentModel({
       roll,
       username,
       password:hasPwd,
       grade
     })
    await newStudent.save();
    return res.status(201).json({registered: true})
   } catch (error) {
      return res.status(500).json({message:"Server error BE"})
   }
}