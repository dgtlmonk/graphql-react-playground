import React from 'react';
import {graphql} from 'react-apollo';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import {gqlAuthor} from '../queries';

const BookList = ({books}) =>
  books.map(book => (
    <span key={book.id} className="book-others">
      {book.name}
    </span>
  ));

// eslint-disable-next-line no-unused-vars
function Author({authorId, data}) {
  const {loading, author} = data;
  return (
    <div className="author-info">
      {loading ? (
        <div>loading ..</div>
      ) : (
        <>
          <div className="author-info__name">
            <Icon color="primary">perm_identity</Icon>
            {author && author.name}
          </div>
          <div className="author-info__books">
            {author && author.books ? (
              <>
                <p>other books</p>
                <BookList books={author.books} />
              </>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}

Author.propTypes = {
  authorId: PropTypes.string,
  data: PropTypes.shape({
    loading: PropTypes.bool,
    author: PropTypes.objectOf({
      name: PropTypes.string,
      id: PropTypes.number,
      books: PropTypes.array,
    }),
  }),
};

Author.defaultProps = {
  data: {},
  authorId: null,
};

export default graphql(gqlAuthor, {
  options: props => {
    return {
      variables: {
        id: props.authorId,
      },
    };
  },
})(Author);
