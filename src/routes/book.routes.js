import { Router } from "express";
import { createBook, deleteBook, getAllBooks, getBook, listOfBooks, updateBook} from "../controllers/Books.controllers.js";
const bookR = Router()


bookR.get('/', listOfBooks );

bookR.get('/getAllBooks', getAllBooks )

bookR.get('/:id', getBook );

bookR.post('/', createBook );

bookR.put('/:id', updateBook );

bookR.delete('/:id', deleteBook );

export { bookR };