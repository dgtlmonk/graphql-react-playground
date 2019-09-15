import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from "graphql";

import { Book, Author } from "../models";

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      // eslint-disable-next-line no-use-before-define
      type: new GraphQLList(BookType),
      resolve(parent) {
        return Book.find({ authorId: parent.id });
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
      resolve(parent) {
        return Author.findById(parent.authorId);
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
        return Book.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return Book.find({});
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      args: { id: { type: GraphQLID } },
      resolve() {
        return Author.find({});
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
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const author = new Author({
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
        name: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLID },
        genre: { type: GraphQLString }
      },
      resolve(parent, args) {
        const book = new Book({
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
