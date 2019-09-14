import _ from "lodash";
import { getObjectId } from "../.scripts/helper";
import { Book, Author } from "../models/";
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} from "graphql";

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    // relationship
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(books, { id: args.id });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      // args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return books;
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return authors;
      }
    }
  }
});

const Mutations = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        });
        // tell graphql to return the result after saving
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        authorId: { type: GraphQLID },
        genre: { type: GraphQLString }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          authorId: args.authorId,
          genre: args.genre
        });
        // tell graphql to return the result after saving
        return book.save();
      }
    }
  }
});
// Put together a schema
export default new GraphQLSchema({ query: RootQuery, mutation: Mutations });
