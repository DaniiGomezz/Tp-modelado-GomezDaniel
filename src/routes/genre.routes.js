import { Router } from "express";
import {createGenre, getAllGenres, deleteGenre, updateGenre} from "../controllers/Genre.controllers.js";
const genreR = Router()



genreR.post('/', createGenre)
genreR.get('/', getAllGenres)
genreR.delete('/:id', deleteGenre )
genreR.put('/:id', updateGenre)
export {genreR}