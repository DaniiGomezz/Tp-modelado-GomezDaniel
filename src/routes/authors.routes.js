import { Router } from "express";
const authorsR = Router();
import { CreateAuthor, deleteAuthor, getAllAuthors, getAuthorById, updateAuthor } from "../controllers/Authors.controllers.js";

authorsR.get('/', getAllAuthors)

authorsR.get('/:id', getAuthorById)

authorsR.post('/', CreateAuthor)

authorsR.put('/:id', updateAuthor)

authorsR.delete('/:id', deleteAuthor)

export { authorsR };