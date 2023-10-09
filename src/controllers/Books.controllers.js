import { Books } from "../schema/Books.js";

// Create book
export const createBook = async (req, res) => {
  try {
    const { title, yearPublication, bookGenre, author } = req.body;

    if (!req.files || !(req.files).length === 0) {
      return res.status(400).json({ message: 'No coverPage file was uploaded' });
    }

    if(!bookGenre || !author) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const file = req.files.FILE;
    const path = `public/uploads${file.name}`;

    file.mv(path, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error when uploading the cover page', error: err });
      }

      const newBook = new Books({
        title,
        yearPublication,
        coverPage: path,
        bookGenre,
        author
      });

      await newBook.save();

      res.status(201).json({ message: "Book created successfully", newBook });
    });  

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'error when creating the book', error })
  }  
};

// Delete book
export const deleteBook = async (req, res) => {
    const bookId = req.params.id
    try {
        const deleteBook = await Books.findByIdAndDelete(bookId);
        if (!deleteBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error when deleting the book', error });
    }
}

export const updateBook = async (req, res) => {
    const bookId = req.params.id
    const { title, yearPublication, coverPage, bookGenre, author } = req.body
    try {
        const updateBook = await Books.findByIdAndUpdate(bookId,
        { title, yearPublication, coverPage, bookGenre, author }, { new: true, runValidators: true });
        
        if (!updateBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book updated", updateBook });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error when updating the book', error });
    }
}

// Get all books
export const getAllBooks = async (req, res) => {
    try {
        const books = await Books.find();
        
        if (!books) {
          return res.status(404).json({ message: "Books not found" });
        }

        res.status(200).json(books);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error when getting the books', error });
    }
};

// Get book
export const getBook = async (req, res) => {
    const bookId = req.params.id
    try {
        const book = await Books.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error when getting the book', error });
    }
}

export const listOfBooks = async (req, res) => {
  try {
    const books = await Books.find()
      .populate('bookGenre', 'name') 
      .populate('author', 'firstName lastName');
    const list = books.map((book) => ({
      title: book.title,
      genre: book.genre.name, 
      author: `${book.author.firstName} ${book.author.lastName}`
    }));

    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener los libros', error });
  }
};
