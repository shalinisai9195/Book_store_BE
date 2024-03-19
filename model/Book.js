import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name:{
    type:String,
    require:true,
    
  },
  author:{
    type:String,
    require:true,
    
  },
  imageUrl:{
    type:String,
    require:true
  }

})

const bookModel = mongoose.model('book',bookSchema);

export default bookModel