// BookList.js (using Material UI)
import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Link,
} from '@mui/material';

const BookList = ({ books }) => {
    if (!books || books.length === 0) {
        return <p>No books have been added yet.</p>;
    }

    return (
        <div>
            <h3>Saved Books</h3>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="left">Author</TableCell>
                            <TableCell align="left">ISBN</TableCell>
                            <TableCell align="left">Genre(s)</TableCell>
                            <TableCell align="left">Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.length > 0 && books.map((book) => {
                            console.log("Current Book:", book);
                            return (
                                <TableRow
                                    key={book._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {book.title}
                                    </TableCell>
                                    <TableCell align="left">{book.author.name}</TableCell>
                                    <TableCell align="left">{book.ISBN}</TableCell>
                                    <TableCell align="left">{book.genre[0].name}</TableCell>
                                    <TableCell align="left">
                                        {book.url && (
                                            <Link href={book.url} target="_blank" rel="noopener noreferrer">
                                                View
                                            </Link>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default BookList;