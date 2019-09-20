/* eslint-disable react/prop-types */
import React, {useState, createContext} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';
import {qryBooks} from '../queries';
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

function BookList({children, data}) {
  const [isAddBookFormVisible, handleAddBook] = useState(
    initialFormStateVisibility,
  );

  const toggleFormVisibility = () => handleAddBook(s => !s);
  const handleAddNewBook = ({details}) => {
    // eslint-disable-next-line no-console
    console.log('add new book from Booklist called', details);
  };

  return (
    <BooksContext.Provider value={isAddBookFormVisible}>
      {React.cloneElement(children, {
        onToggle: toggleFormVisibility,
        onAddNewbook: handleAddNewBook,
      })}
      <div className="book-list">
        {data.loading ? (
          <div style={{padding: `1em`}}>
            fetching data, please wait ..
          </div>
        ) : (
          <div>
            <Books books={data.books} />
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
            <button type="button" onClick={onToggle}>
              Add Book
            </button>
          </div>
          <div className="book-list__form">
            <BookForm onAddNewbook={onAddNewbook} />
          </div>
        </div>
      )}
    </BookListConsumer>
  );
};

BookList.propTypes = {
  //  `data` props is from ApolloProvider, hence it's shape
  //  may change in the future, so we dont want to bread this
  //  code
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export default graphql(qryBooks)(BookList);
