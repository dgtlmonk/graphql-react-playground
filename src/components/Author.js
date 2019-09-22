import React from 'react';
import {graphql} from 'react-apollo';
import PropTypes from 'prop-types';
import {gqlAuthor} from '../queries';

const Author = ({authorId}) => {
  return <div>author detail {authorId}</div>;
};

Author.propTypes = {
  authorId: PropTypes.string.isRequired,
};
export default graphql(gqlAuthor, {
  // options: props => {
  //   return {
  //     variables: {
  //       id: props.authorId,
  //     },
  //   };
  // },
})(Author);
