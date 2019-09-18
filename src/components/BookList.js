import React from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';
import PropTypes from 'prop-types';

const getBooks = gql`
  {
    books {
      id
      name
      genre
    }
  }
`;

const Books = ({books}) =>
  books.map(book => (
    <div key={book.id}>
      {book.name}
      <div>{book.genre}</div>
    </div>
  ));

function BookList({data}) {
  return (
    <div>
      {data.loading ? (
        <div>loading data</div>
      ) : (
        <div>
          {' '}
          <Books books={data.books} />
        </div>
      )}
    </div>
  );
}

BookList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};
export default graphql(getBooks)(BookList);
