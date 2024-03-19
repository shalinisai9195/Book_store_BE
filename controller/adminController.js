import adminModel from "../model/Admin.js";
import bcrypt from 'bcrypt'
//import cookie from "cookie-parser";
import jwt from "jsonwebtoken";
import studentModel from '../model/Student.js'
import dotevn from 'dotenv';
dotevn.config();



export const getadmin = async(req,res,next)=>{
  try {
    const adminUser = await adminModel.find()

    return res.status(200).json({adminUser})

  } catch (error) {
    return console.log('error in admin getuser',error)
  }
}

export const signUpAdmin = async(req,res,next)=>{
  let {username,password} = req.body
   try {
    
  let existadmin = await adminModel.findOne({username})
  if(existadmin){
      return res.status(404).json({message:'admin existed already'})
  }
      let hashPwd = bcrypt.hashSync(password,10)
      //console.log(hashPwd)
      let admin = new adminModel({
        username,
        password : hashPwd
      })  
  
      await admin.save();
      return res.status(201).json({signup:true,admin})

    }
    
  catch (error) {
    return  console.log('error in signUp BE',error)
  }
  
}

export const loginAdmin = async(req,res)=>{
  
  try {
    let {username,password,role} = req.body
  let admin;
    if(role === 'admin'){
      admin = await adminModel.findOne({username})

      if(!admin){
        return res.status(404).json({message:"admin not register"})
      }
      let validPassword = bcrypt.compareSync(password,admin.password)
      if(!validPassword){
        return res.status(404).json({message:"wrong pwd"})
      }
      
      let token = jwt.sign({username:admin.username, role:'admin'},process.env.Admin_key)

       res.cookie('token',token,{httpOnly: true, secure: true})
        return res.status(200).json({login:true,role:'admin'})

    }else if( role === 'student'){

     let student = await studentModel.findOne({username})

      if(!student){
        return res.status(404).json({message:"student not register"})
      }
      let validPassword = bcrypt.compareSync(password,student.password)

      if(!validPassword){
        return res.status(404).json({message:"wrong pwd"})
      }
      
      let token = jwt.sign({username: student.username, role:'student'},process.env.student_key)

       res.cookie('token',token,{httpOnly: true, secure: true})
        return res.status(200).json({login:true,role:'student'})

    }else{
      return res.json({message:"error in login check properly BE"})
    }
  } catch (error) {
    return res.status(500).json({message:"server error"})
  }


}

export const verifyAdmin = async(req,res,next)=>{
  try {
    const token = req.cookies.token;

    if(!token){
      return res.status(404).json({message:"Invalid Admin BE"})
    }else{
      jwt.verify(token,process.env.Admin_key, (err,decode)=>{
        if(err){
          return res.json({message:"Invalid token"})
        }else{
          req.username = decode.username;
          req.role = decode.role
          next();
        }
           
      })
    }
    
  } catch (error) {
     return res.status(500).json({message:"server error BE Admin"})
  }
}

export const verifyUser = async(req,res,next)=>{
  try {
    const token = req.cookies.token;

    if(!token){
      return res.status(404).json({message:"Invalid Admin BE"})
    }else{
      jwt.verify(token,process.env.Admin_key, (err,decode)=>{
        if(err){
          jwt.verify(token,process.env.student_key, (err,decode)=>{
            if(err){
              return res.json({message:"Invalid token"})
            }else{
              req.username = decode.username;
              req.role = decode.role
              next();
            }
               
          })
        }else{
          req.username = decode.username;
          req.role = decode.role
          next();
        }
           
      })
    }
    
  } catch (error) {
     return res.status(500).json({message:"server error BE Admin"})
  }
}
export const adminVerify = async(req,res)=>{

    return res.status(200).json({login:true, role: req.role})
}

export const logoutAdmin = async(req,res)=>{

  try {
    res.clearCookie('token')
    return res.status(200).json({logout:true})

    
  } catch (error) {
    return res.status(500).json({message:"server error BE AdminLogout"})
  }

}