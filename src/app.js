import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import BookList from './components/BookList';
import AuthorList from './components/AuthorList';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

export default () => (
  <ApolloProvider client={client}>
    <div>
      <h1>Booklist</h1>
      <BookList />
      <h1>Author List</h1>
      <AuthorList />
    </div>
  </ApolloProvider>
);
