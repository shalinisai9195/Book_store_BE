import express from 'express';
import Dbconnect from './DBConnection/db.js';
import routerAdmin from './router/adminRouter.js';
import routerStudent from './router/studentRoute.js';
import routerBook from './router/bookRouter.js';
import bookModel from './model/Book.js';
import adminModel from './model/Admin.js';
import studentModel from './model/Student.js';
import cookieParser from "cookie-parser";
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();

Dbconnect();

const app = express();
const port = process.env.PORT || 3001

app.use(express.json())
app.use(cors({
  origin:[`http://localhost:5173`],
  credentials:true
}))
app.use(cookieParser())

app.use('/api/admin',routerAdmin);
app.use('/api/student',routerStudent);
app.use('/api/book',routerBook)

app.use('/api/dashboard', async(req,res)=>{
  try {

    let books = await bookModel.countDocuments()
    let student = await studentModel.countDocuments()
    let admin = await adminModel.countDocuments()

    return res.status(200).json({dashboard:true,books,student,admin})
    
  } catch (error) {
    return res.status(500).json({message:"error in index dashbord"})
  }

})

app.listen(port,()=>{
  console.log(`server listen a port: ${port}`)
})