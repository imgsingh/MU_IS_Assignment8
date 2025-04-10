// CreateBook.js
import React, { useState, useEffect } from 'react';
import config from './../config';
import BookList from './BookList';
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Box,
    styled,
    createTheme,
    ThemeProvider,
} from '@mui/material';

// Custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#FF4081',
        },
        secondary: {
            main: '#64B5F6',
        },
        background: {
            default: '#FCE4EC',
            paper: '#FFF',
        },
        text: {
            primary: '#333',
            secondary: '#777',
        },
    },
    typography: {
        fontFamily: "'Montserrat', sans-serif",
        h5: {
            fontWeight: 600,
            marginBottom: '1.5em',
            color: '#FF4081',
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& label.Mui-focused': {
                        color: '#FF4081',
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#E0E0E0',
                        },
                        '&:hover fieldset': {
                            borderColor: '#FF4081',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#FF4081',
                        },
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#E0E0E0',
                        },
                        '&:hover fieldset': {
                            borderColor: '#FF4081',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#FF4081',
                        },
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                containedPrimary: {
                    backgroundColor: '#FF4081',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#F50057',
                    },
                },
            },
        },
    },
});

const FormContainer = styled(Box)(({ theme }) => ({
    maxWidth: 800,
    margin: '30px auto',
    padding: theme.spacing(4),
    borderRadius: 8,
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
}));

const StyledForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
}));

const FormRow = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    width: '100%',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5),
    fontSize: '1rem',
    fontWeight: 500,
    width: '100%',
}));

const CreateBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [summary, setSummary] = useState('');
    const [isbn, setIsbn] = useState('');
    const [genre, setGenre] = useState('');
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [savedBooks, setSavedBooks] = useState([]);
    const [availableGenres, setAvailableGenres] = useState([
        'Fiction', 'Mystery', 'Science Fiction', 'Fantasy',
        'Thriller', 'Romance', 'Historical Fiction', 'Non-Fiction'
    ]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await fetch(`${config.apiUrl}/api/books`);
            if (response.ok) {
                const data = await response.json();
                setSavedBooks(data);
            }
        } catch (err) {
            console.error('Error fetching books:', err);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch(`${config.apiUrl}/api/books`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    author,
                    summary,
                    ISBN: isbn,
                    genre: [genre],
                    url,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setTitle('');
                setAuthor('');
                setSummary('');
                setIsbn('');
                setGenre('');
                setUrl('');
                setSuccessMessage('Book created successfully!');
                fetchBooks();
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to create book');
            }
        } catch (err) {
            console.error('Error creating book:', err);
            setError('Failed to connect to the server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <FormContainer>
                <Typography variant="h5" component="h2" align="center" gutterBottom>
                    Create New Book
                </Typography>

                {successMessage && (
                    <Typography color="success" align="center" gutterBottom>
                        {successMessage}
                    </Typography>
                )}

                {error && (
                    <Typography color="error" align="center" gutterBottom>
                        {error}
                    </Typography>
                )}

                <StyledForm onSubmit={handleSubmit}>
                    <FormRow>
                        <StyledFormControl>
                            <InputLabel htmlFor="title">Title</InputLabel>
                            <TextField
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                variant="outlined"
                                fullWidth
                            />
                        </StyledFormControl>
                    </FormRow>

                    <FormRow>
                        <StyledFormControl>
                            <InputLabel htmlFor="author">Author</InputLabel>
                            <TextField
                                id="author"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                required
                                variant="outlined"
                                fullWidth
                            />
                        </StyledFormControl>
                    </FormRow>

                    <FormRow>
                        <StyledFormControl>
                            <InputLabel htmlFor="summary">Summary</InputLabel>
                            <TextField
                                id="summary"
                                multiline
                                rows={4}
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                variant="outlined"
                                fullWidth
                            />
                        </StyledFormControl>
                    </FormRow>

                    <FormRow>
                        <StyledFormControl>
                            <InputLabel htmlFor="isbn">ISBN</InputLabel>
                            <TextField
                                id="isbn"
                                value={isbn}
                                onChange={(e) => setIsbn(e.target.value)}
                                variant="outlined"
                                fullWidth
                            />
                        </StyledFormControl>
                    </FormRow>

                    <FormRow>
                        <StyledFormControl>
                            <InputLabel id="genre-label">Genre</InputLabel>
                            <Select
                                labelId="genre-label"
                                id="genre"
                                value={genre}
                                label="Genre"
                                onChange={(e) => setGenre(e.target.value)}
                                variant="outlined"
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>Select a genre</em>
                                </MenuItem>
                                {availableGenres.map((g) => (
                                    <MenuItem key={g} value={g}>{g}</MenuItem>
                                ))}
                            </Select>
                        </StyledFormControl>
                    </FormRow>

                    <FormRow>
                        <StyledFormControl>
                            <InputLabel htmlFor="url">URL</InputLabel>
                            <TextField
                                id="url"
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                variant="outlined"
                                fullWidth
                            />
                        </StyledFormControl>
                    </FormRow>

                    <FormRow>
                        <StyledButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Book'}
                        </StyledButton>
                    </FormRow>
                </StyledForm>

                <BookList books={savedBooks} />
            </FormContainer>
        </ThemeProvider>
    );
};

export default CreateBook;