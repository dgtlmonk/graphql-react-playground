/* eslint-disable react/prop-types */
import React, {useState, createContext} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import {gqlBooks, gqlAddBook} from '../queries';
import BookForm from './BookForm';
import Author from './Author';
import Books from './Books';

const initialFormStateVisibility = false;
const BooksContext = createContext({});

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
  const [authorId, setAuthorId] = useState(null);
  const toggleFormVisibility = () => handleAddBook(s => !s);
  const handleAddNewBook = ({details}) => {
    // eslint-disable-next-line no-console
    console.log('add new book from Booklist called', details);
    gqlAddBookMutation({
      variables: {...details},
      refetchQueries: [{query: gqlBooks}],
    });
  };

  function handleAuthorClick(authorId) {
    setAuthorId(authorId);
  }

  return (
    <BooksContext.Provider value={isAddBookFormVisible}>
      {React.cloneElement(children, {
        onToggle: toggleFormVisibility,
        onAddNewbook: handleAddNewBook,
      })}
      <div>
        {gqlBookQuery.loading ? (
          <div style={{padding: `1em`}}>
            fetching data, please wait ..
          </div>
        ) : (
          <div className="book-list">
            <div>
              <Books
                books={gqlBookQuery.books}
                onAuthorClick={handleAuthorClick}
              />
            </div>
            <div style={{width: `50%`}}>
              <Card
                className="book-list__author"
                style={{
                  display: authorId ? ` block` : ` none`,
                  width: `auto`,
                }}
              >
                <CardContent>
                  <Author authorId={authorId} />
                </CardContent>
              </Card>
            </div>
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
            <BookForm onAddNewbook={onAddNewbook} onBack={onToggle} />
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
