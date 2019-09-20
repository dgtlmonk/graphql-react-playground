import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';
import {qryAuthors} from '../queries';

const Authors = ({authors}) =>
  authors.map(author => <div key={author.id}> {author.name}</div>);

function AuthorList({data}) {
  const {authors} = data;
  return (
    <>
      <select>
        {data.loading ? (
          <div>loading data</div>
        ) : (
          <Authors authors={authors} />
        )}
      </select>
    </>
  );
}

AuthorList.propTypes = {
  //  `data` props is from ApolloProvider, hence it's shape
  //  may change in the future, so we dont want to bread this
  //  code
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export default graphql(qryAuthors)(AuthorList);
