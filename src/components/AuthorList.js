import React from 'react';
import PropTypes from 'prop-types';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

const getAuthors = gql`
  {
    authors {
      id
      name
    }
  }
`;

const Authors = ({authors}) =>
  authors.map(author => <div key={author.id}> {author.name}</div>);

function AuthorList({data}) {
  const {authors} = data;
  return (
    <div>
      <div>
        {data.loading ? (
          <div>loading data</div>
        ) : (
          <div>
            <Authors authors={authors} />
          </div>
        )}
      </div>
    </div>
  );
}

AuthorList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export default graphql(getAuthors)(AuthorList);
