import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
import {graphql} from 'react-apollo';
import {gqlAuthors} from '../queries';

function AuthorList({data, onSelect}) {
  const [author, setAuthor] = React.useState([]);
  const {authors} = data;

  return (
    <>
      {data.loading ? (
        <Select disabled placeholder="loading authors ..." />
      ) : (
        <FormControl style={{minWidth: `150px`}}>
          <InputLabel htmlFor="select-authors">Author</InputLabel>
          <Select
            required
            native
            placeholder="Select book author"
            value={author}
            inputProps={{name: 'author', id: 'select-authors'}}
            onChange={e => {
              setAuthor(e.target.value);
              onSelect({author: e.target.value});
            }}
          >
            <option value="" aria-label="select author" />
            {authors.map(author => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </Select>
        </FormControl>
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

export default graphql(gqlAuthors)(AuthorList);
