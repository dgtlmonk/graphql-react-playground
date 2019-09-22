import React from 'react';
import Book from './Book';

export default function Books({books, onAuthorClick}) {
  return (
    books.length &&
    books.map(book => (
      <Book key={book.id} book={book} onAuthorClick={onAuthorClick} />
    ))
  );
}
