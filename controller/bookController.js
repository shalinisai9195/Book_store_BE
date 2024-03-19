import { text } from "express";
import bookModel from "../model/Book.js";



export const addBook = async(req,res)=>{
   try {
     const{name,author,imageUrl} = req.body;
     let newBook = new bookModel({
    name,
    author,
    imageUrl
   })
   
   await newBook.save();
  return res.status(201).json({added:true,newBook})
} catch (error) {
       return res.status(500).json({message:'Server error',error})
   }
}

export const getAllBooks = async(req,res)=>{

  try {

    let books = await bookModel.find()

    return res.status(200).json({books})
     
  } catch (error) {
    
    return res.status(500).json({message:'Server error',error})
  }

}

export const getBookById = async(req,res)=>{

  try {

    const id = req.params.id
    let book = await bookModel.findById({_id:id})

    if(!book){
      return res.status(404).json({message:'Book not founnd'})
    }

    return res.status(200).json({book})
    
  } catch (error) {
    return res.status(500).json({message:'Server error',error})
  }

}

export const updateBook = async(req,res)=>{
   try {
     
    const id = req.params.id
   // const{name,author,imageUrl} = req.body

    const updBook = await bookModel.findByIdAndUpdate({_id:id}, req.body)

    return res.status(200).json({updated:true,updBook})

  } catch (error) {
    return res.status(500).json({message:'Server error',error})
   }
}

export const deleteBook = async(req,res)=>{
   try {
   const id = req.params.id
   let book = await bookModel.findByIdAndDelete({_id: id})

   return res.status(200).json({deleted:true,book})

   } catch (error) {
    return res.status(500).json({message:'Server error',error})
   }

}