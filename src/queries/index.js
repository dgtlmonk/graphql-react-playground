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

const gqlAuthor = gql`
  query($id: ID) {
    author(id: $id) {
      id
      name
      books {
        id
        name
        genre
      }
    }
  }
`;

export {gqlAuthors, gqlBooks, gqlAuthor, gqlAddBook};
