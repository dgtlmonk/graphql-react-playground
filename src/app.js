import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import BookList from './components/BookList';
import AuthorList from './components/AuthorList';
import './styles/app.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

export default () => (
  <ApolloProvider client={client}>
    <div className="playground">
      <div className="playground__lists">
        <div className="playground-books">
          <h1 className="heading">Booklist</h1>
          <BookList>
            <BookList.AddButton />
          </BookList>
        </div>
        <div className="playground-authors">
          <h1 className="heading">Authors</h1>
          <AuthorList />
        </div>
      </div>
    </div>
  </ApolloProvider>
);
