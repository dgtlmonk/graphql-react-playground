import React from 'react';
import PropTypes from 'prop-types';

// having CSS inside JS is case-to-case basis
// but generally not a good practice, so dont copy
// this pattern, unless you or your team have
// a good reason to :)

const bookStyle = {
  wrapper: {
    display: `flex`,
    flexFlow: `column`,
    padding: `.5rem`,
  },
  bookGenre: {
    fontSize: `14px`,
    fontWeight: `600`,
    color: `#b75c97`,
  },
  bookName: {fontWeight: 900, fontSize: `18px`},
  bookAuthor: {fontSize: `12px`},
};

const Book = ({book}) => {
  return (
    <div key={book.id} className="book" style={bookStyle.wrapper}>
      <div className="book-name" style={bookStyle.bookName}>
        {book.name}
      </div>
      <div className="book-genre" style={bookStyle.bookGenre}>
        {String(book.genre).replace(/[*|]/g, `,`)}
      </div>
      <div className="book-author" style={bookStyle.bookAuthor}>
        {book.author.name}
      </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    author: PropTypes.object,
  }).isRequired,
};

export default Book;
