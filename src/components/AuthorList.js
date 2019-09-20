import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';
import {Select} from 'semantic-ui-react';
import {qryAuthors} from '../queries';

const serializeAuthors = ({authors}) => {
  return authors.map(author => {
    return {
      key: `${author.id}`,
      value: `${author.id}`,
      text: `${author.name}`,
    };
  });
};

function AuthorList({data, onSelect}) {
  const {authors} = data;
  return (
    <>
      {data.loading ? (
        <span>loading authors ...</span>
      ) : (
        <Select
          label="Author"
          placeholder="Select book author"
          onChange={(e, {value}) => onSelect({author: value})}
          options={serializeAuthors({authors})}
        />
      )}
    </>
  );
}

AuthorList.propTypes = {
  //  `data` props is from ApolloProvider, hence it's shape
  //  may change in the future, so we dont want to bread this
  //  code
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default graphql(qryAuthors)(AuthorList);
