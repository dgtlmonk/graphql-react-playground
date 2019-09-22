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

const gqlBook = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        books {
          name
          id
        }
      }
    }
  }
`;

export {gqlAuthors, gqlBooks, gqlBook, gqlAddBook};
