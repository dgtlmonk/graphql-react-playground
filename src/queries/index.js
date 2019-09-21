import {gql} from 'apollo-boost';

const gqlAuthors = gql`
  {
    authors {
      id
      name
    }
  }
`;

const gqlBooks = gql`
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

const gqlAddBook = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;
export {gqlAuthors, gqlBooks, gqlAddBook};
