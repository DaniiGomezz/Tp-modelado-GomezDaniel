import { Books } from "../schema/Books.js";
import { Genre } from "../schema/Genre.js";

// Create genre
export const createGenre = async (req, res) => {
    try {
        const genre = new Genre({
            nameGenre: req.body.name
        })
        genre.save();
        res.status(200).send({ message: "genre successfully created", genre });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error when creating the genre', error });
    }
};

// Get all genres
export const getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find()
        res.status(200).send({ message: "Genres found in the database ", genres });
    } catch (error) {
        res.status(500).send({mensage: "Internal error when getting generics"},error);
    }
}


//delete for id genre
export const deleteGenre = async (req, res) => {
    const genreId = req.params.id
    try {
        const deleteGenre = await Genre.findByIdAndDelete(genreId);

        if (!deleteGenre) {
            return res.status(404).json({ message: "Genre not found" });
        }
        res.status(200).send({ message: "Genre deleted", deleteGenre });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error when deleting the Genre', error });
    }
};

// Update Genre
export const updateGenre = async (req, res) => {
    const genreId = req.params.id
    const { nameGenre } = req.body
  
    try {
        const updateGenre = await Genre.findByIdAndUpdate(genreId,
            { nameGenre }, { new: true, runValidators: true });
  
      res.status(200).send({ message: "author correctly updated", updateGenre });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something goes wrong' })
    }
  }

  
  export const booksByGenre = async (req, res) => {
    const { id } = req.params
    try {
        const books = await Books.find({ genre: id })
        res.status(200).json(
            { message: "En esta categoria hay " + books.length + " libros", books }
        )
    }
    catch (error) {
        res.status(500).send(error)
    }
};

