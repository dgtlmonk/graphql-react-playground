/* eslint-disable react/prop-types */
import React, {useState, createContext} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';
import {qryBooks} from '../queries';
import Book from './Book';

const BooksContext = createContext();

function BookListConsumer(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <BooksContext.Consumer {...props}>
      {context => props.children(context)}
    </BooksContext.Consumer>
  );
}

// FIXME: add `map` error handling
const Books = ({books}) =>
  books.map(book => <Book key={book.id} book={book} />);

function BookList({children, data}) {
  const [isAddFormVisible, handleAddNewBook] = useState(false);
  const toggleFormVisibility = () => handleAddNewBook(s => !s);

  return (
    <BooksContext.Provider>
      {React.cloneElement(children, {
        data,
        onClick: toggleFormVisibility,
      })}
      <div>
        {isAddFormVisible.toString()}
        {data.loading ? (
          <div style={{padding: `1em`}}>
            Fetching data. please wait ..
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

BookList.AddButton = ({onClick}) => (
  <BookListConsumer>
    {() => (
      // eslint-disable-next-line react/button-has-type
      <button onClick={onClick}>Add Book</button>
    )}
  </BookListConsumer>
);

BookList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export default graphql(qryBooks)(BookList);
