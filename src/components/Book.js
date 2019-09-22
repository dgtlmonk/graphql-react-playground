import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';

// having CSS inside JS is case-to-case basis
// but generally not a good practice, so dont copy
// this pattern, unless you or your team have
// a good reason to :)
//
// This is just proof of concept mini-app
// so im not really over-engineering things here :)

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
  bookAuthor: {fontSize: `12px`, width: `80%`},
};

function Book({book, onAuthorClick}) {
  return (
    <div key={book.id} className="book" style={bookStyle.wrapper}>
      <div className="book-name" style={bookStyle.bookName}>
        {book.name}
      </div>
      <div className="book-genre" style={bookStyle.bookGenre}>
        {String(book.genre).replace(/[*|]/g, `,`)}
      </div>
      <div>
        <div
          role="presentation"
          className="book-author"
          style={bookStyle.bookAuthor}
          onClick={() => onAuthorClick(book.author.id)}
        >
          <Icon color="primary">perm_identity</Icon>
          {book.author.name}
        </div>
      </div>
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    author: PropTypes.object,
  }).isRequired,
  onAuthorClick: PropTypes.func.isRequired,
};

export default Book;
