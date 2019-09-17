import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import BookList from './components/BookList';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

export default () => (
  <ApolloProvider client={client}>
    <div>
      <h1>Booklist</h1>
      <BookList />
    </div>
  </ApolloProvider>
);
