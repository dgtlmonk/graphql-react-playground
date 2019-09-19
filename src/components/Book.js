import React from 'react';
import PropTypes from 'prop-types';

// pardon the in-line style T_T, this is just an experiment
const Book = ({book}) => {
  return (
    <div
      key={book.id}
      className="book"
      style={{display: `flex`, flexFlow: `column`, padding: `.5rem`}}
    >
      <div
        className="book-name"
        style={{fontWeight: 900, fontSize: `20px`}}
      >
        {book.name}
      </div>
      <div
        className="book-name"
        style={{
          fontSize: `14px`,
          fontWeight: `600`,
          color: `#b75c97`,
        }}
      >
        {String(book.genre).replace(/[*|]/g, `,`)}
      </div>
      <div className="book-author" style={{fontSize: `12px`}}>
        {book.author.name}
      </div>
    </div>
  );
};

Book.propTypes = {
  // book: PropTypes.object.isRequired,
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    author: PropTypes.object,
  }).isRequired,
};

export default Book;
