/* eslint-disable react/prop-types */
import React, {useState, createContext} from 'react';
import Button from '@material-ui/core/Button';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import {gqlBooks, gqlAddBook} from '../queries';
import Book from './Book';
import BookForm from './BookForm';

const initialFormStateVisibility = false;
const BooksContext = createContext({});
const Books = ({books}) =>
  books.length &&
  books.map(book => <Book key={book.id} book={book} />);

function BookListConsumer(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <BooksContext.Consumer {...props}>
      {context => props.children(context)}
    </BooksContext.Consumer>
  );
}

function BookList({gqlBookQuery, gqlAddBookMutation, children}) {
  const [isAddBookFormVisible, handleAddBook] = useState(
    initialFormStateVisibility,
  );

  const toggleFormVisibility = () => handleAddBook(s => !s);
  const handleAddNewBook = ({details}) => {
    // eslint-disable-next-line no-console
    console.log('add new book from Booklist called', details);
    gqlAddBookMutation({variables: {...details}});
  };

  return (
    <BooksContext.Provider value={isAddBookFormVisible}>
      {React.cloneElement(children, {
        onToggle: toggleFormVisibility,
        onAddNewbook: handleAddNewBook,
      })}
      <div className="book-list">
        {gqlBookQuery.loading ? (
          <div style={{padding: `1em`}}>
            fetching data, please wait ..
          </div>
        ) : (
          <div>
            <Books books={gqlBookQuery.books} />
          </div>
        )}
      </div>
    </BooksContext.Provider>
  );
}

BookList.AddNewBookForm = ({onToggle, onAddNewbook}) => {
  return (
    <BookListConsumer>
      {isAddBookFormVisible => (
        <div
          className={
            isAddBookFormVisible
              ? `book-list__form--visible`
              : `book-list__form--hidden`
          }
        >
          <div className="book-list__add-btn">
            <Button
              variant="contained"
              type="button"
              color="primary"
              onClick={onToggle}
            >
              Add Book
            </Button>
          </div>
          <div className="book-list__form">
            <BookForm
              onAddNewbook={onAddNewbook}
              onCancel={onToggle}
            />
          </div>
        </div>
      )}
    </BookListConsumer>
  );
};

export default compose(
  graphql(gqlBooks, {name: 'gqlBookQuery'}),
  graphql(gqlAddBook, {name: 'gqlAddBookMutation'}),
)(BookList);
