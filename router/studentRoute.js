import express from 'express';
import {register} from './../controller/studentController.js'
import { verifyAdmin } from '../controller/adminController.js';


const router = express.Router();

router.post('/register',verifyAdmin,register)


export default router;
