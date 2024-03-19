import expres from 'express';
import {verifyAdmin} from './../controller/adminController.js'
import {addBook,getAllBooks,getBookById,updateBook,deleteBook} from './../controller/bookController.js'

let router = expres.Router()

router.post('/add',verifyAdmin,addBook)
router.get('/books',getAllBooks);
router.get('/book/:id',getBookById)
router.put('/update/:id',updateBook)
router.delete('/delete/:id',deleteBook)


export default router;