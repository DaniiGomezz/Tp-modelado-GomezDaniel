import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'node:path';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import 'dotenv/config';
import 'ejs';


//Route Databse
import { connectMongoDb } from './src/config/database.js';

//Routes acction
import { authorsR } from './src/routes/authors.routes.js';
import { genreR } from './src//routes/genre.routes.js';
import { bookR } from './src/routes/book.routes.js';
import {fileRouter } from './src/routes/file.routes.js';


//Schemas
import { Author } from './src/schema/Author.js';
import { Genre } from './src/schema/Genre.js';
import { Books } from './src/schema/Books.js';


//Middlewares
const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
  }));
app.use(morgan('tiny'));
app.use(helmet());
app.use(express.json())
app.use(fileUpload(
    {
        createParentPath: true,
        limits: { fileSize: 20 * 1024 * 1024 },
        abortOnLimit: true,
        responseOnLimit: "File is too large."
    }
));

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs')
app.use(express.static('public'));





//conection Port and db
const port = process.env.PORT || 3000



app.use('/api/books', bookR)
app.use('/api/authors', authorsR)
app.use('/api/genre', genreR)
app.use('/', fileRouter)

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
    connectMongoDb();
});