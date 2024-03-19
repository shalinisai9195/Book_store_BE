import express from 'express';
import {getadmin,signUpAdmin,loginAdmin,logoutAdmin, adminVerify, verifyUser } from "../controller/adminController.js";


const router = express.Router();

router.get('/',getadmin)
router.post('/add',signUpAdmin);
router.post('/login', loginAdmin);
router.get('/logout',logoutAdmin);
router.get('/verify',verifyUser, adminVerify)


export default router;
