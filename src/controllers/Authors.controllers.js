import { Author } from "../schema/Author.js";

// Get all authors
export const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error when getting the authors', error });
    }
};


// Get author
export const getAuthorById = async (req, res) => {
    const authorId = req.params.id
    try {
        const author = await Author.findById(authorId);
        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }
        res.status(200).json(author);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error when getting the author', error });
    }
};


// Create author
export const CreateAuthor = async (req, res) => {
    try {
        const author = new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            biography: req.body.biography
        })
        author.save();
        res.status(200).send({ message: "Author created", author });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error when creating the author', error });
    }
};


// Update author
export const updateAuthor = async (req, res) => {
    const authorUp = req.params.id
    const { name, firstName, biography } = req.body
  
    try {
      await Author.findByIdAndUpdate(author, { name, firstName, biography })
  
      res.status(200).send({ message: "author correctly updated", authorUp });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something goes wrong' })
    }
  }



// Delete author
export const deleteAuthor = async (req, res) => {
    const authorId = req.params.id
    try {
        const deleteAuthor = await Author.findByIdAndDelete(authorId);

        if (!deleteAuthor) {
            return res.status(404).json({ message: "Author not found" });
        }
        res.status(200).send({ message: "Author deleted", deleteAuthor });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error when deleting the author', error });
    }
};