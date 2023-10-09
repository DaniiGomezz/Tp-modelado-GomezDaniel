import { Router } from "express";
import {createGenre, getAllGenres, deleteGenre, updateGenre, booksByGenre} from "../controllers/Genre.controllers.js";
const genreR = Router()



genreR.post('/', createGenre)
genreR.get('/', getAllGenres)
genreR.delete('/:id', deleteGenre )
genreR.put('/:id', updateGenre)
genreR.get('/bookGenre:id', booksByGenre)


export {genreR}