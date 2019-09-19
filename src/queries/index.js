import {gql} from 'apollo-boost';

const qryAuthors = gql`
  {
    authors {
      id
      name
    }
  }
`;

const qryBooks = gql`
  {
    books {
      id
      name
      genre
      author {
        name
      }
    }
  }
`;
export {qryAuthors, qryBooks};
