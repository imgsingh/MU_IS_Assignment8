// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors({
    origin: 'http://localhost:3001', //Development
    credentials: true,
}));
// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Replace with your actual MongoDB connection URI
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bookstore';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Define the Author schema (as a String)
const authorSchema = new mongoose.Schema({
    name: String,
});
const Author = mongoose.model('Author', authorSchema);

// Define the Genre schema (as a String)
const genreSchema = new mongoose.Schema({
    name: String,
});
const Genre = mongoose.model('Genre', genreSchema);

// Define the Book schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
    summary: String,
    ISBN: String,
    genre: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
    url: String,
});
const Book = mongoose.model('Book', bookSchema);

// --- API Endpoints ---

// GET all books
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find().populate('author', 'name').populate('genre', 'name');
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET a specific book by ID
app.get('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author', 'name').populate('genre', 'name');
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST a new book
app.post('/api/books', async (req, res) => {
    const { title, author: authorName, summary, ISBN, genre: genreNames, url } = req.body;

    try {
        // Create or find the author
        let author = await Author.findOne({ name: authorName });
        if (!author) {
            author = new Author({ name: authorName });
            await author.save();
        }

        // Create or find the genres
        const genreObjectIds = [];
        if (Array.isArray(genreNames)) {
            for (const genreName of genreNames) {
                let genre = await Genre.findOne({ name: genreName });
                if (!genre) {
                    genre = new Genre({ name: genreName });
                    await genre.save();
                }
                genreObjectIds.push(genre._id);
            }
        } else if (typeof genreNames === 'string' && genreNames) {
            let genre = await Genre.findOne({ name: genreNames });
            if (!genre) {
                genre = new Genre({ name: genreNames });
                await genre.save();
            }
            genreObjectIds.push(genre._id);
        }

        const newBook = new Book({
            title,
            author: author._id,
            summary,
            ISBN,
            genre: genreObjectIds,
            url,
        });

        const savedBook = await newBook.save();
        const populatedBook = await Book.findById(savedBook._id).populate('author', 'name').populate('genre', 'name');
        res.status(201).json(populatedBook);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});