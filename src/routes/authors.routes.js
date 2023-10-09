import { Router } from "express";
const routerAuthors = Router();
import { CreateAuthor, deleteAuthor, getAllAuthors, getAuthorById, updateAuthor } from "../controllers/Authors.controllers.js";

routerAuthors.get('/', getAllAuthors)

routerAuthors.get('/:id', getAuthorById)

routerAuthors.post('/', CreateAuthor)

routerAuthors.put('/:id', updateAuthor)

routerAuthors.delete('/:id', deleteAuthor)

export { routerAuthors };