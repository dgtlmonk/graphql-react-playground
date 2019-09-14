import Book from "../models/book";
import Author from "../models/author";
import { getObjectId } from "./helper";
import mongoose from "mongoose";
import { rejects } from "assert";

const bookNames = [
  "Shopworn Angel, The",
  "Sex in Chains (Geschlecht in Fesseln)",
  "Night Editor",
  "On My Way (Elle s'en va)",
  "Travelling Players, The (O thiasos)",
  "Outrageous Fortune",
  "Our Paradise (Notre paradis)",
  "Stan Helsing",
  "Nobel Son",
  "Brave Little Toaster, The"
];

const genres = [
  "Drama|Romance|War",
  "Drama",
  "Comedy|Drama",
  "Drama|War",
  "Comedy|Mystery",
  "Crime|Drama",
  "Comedy|Horror",
  "Comedy|Crime|Drama|Thriller",
  "Animation|Children"
];

let authorsNames = [
  "Marcille Le Fevre",
  "Niki Glacken",
  "Minni Petruska",
  "Revkah Ziemke",
  "Osmund Antonoczyk",
  "Herbert McAline",
  "Germain Tennewell",
  "Ethelda Slobom"
];

export const generateAuthors = () => {
  let authors = [];
  //TODO: add chalk
  console.log("Seeding author collection ...");

  for (let i = 0; i <= authorsNames.length - 1; i++) {
    const authorName = authorsNames[i];
    const author = new Author({
      _id: getObjectId(authorName),
      name: authorName,
      books: []
    });
    // console.log(`${i} ${author}`);
    authors.push(author);
  }
  console.log("-------- \n");
  return authors;
};

export const generateBooks = () => {
  let books = [];
  console.log("Seeding book collection");
  for (let i = 0; i <= bookNames.length - 1; i++) {
    const bookName = bookNames[i];
    const book = new Book({
      name: bookName,
      authorId: getObjectId(
        authors[Math.ceil(Math.random() * authors.length - 1)]
      ),
      genre: genres[Math.ceil(Math.random() * genres.length - 1)]
    });

    books.push(book);
    // console.log(`${i}. ${book}`);
  }
  return books;
};

// FIXME: place credentials in .env
mongoose.connect(
  "mongodb+srv://dgtlmonk00:joufpIC2NFkmE4lS@react-graphql-lab01-rl2ok.mongodb.net/graphql-lab00",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// generateAuthors();

mongoose.connection.once("open", async () => {
  console.log("Connection to mongo cloud db accepted, seeding started ...");
  console.log("Housekeeping collections...");
  const dropCollection = await mongoose.connection.collection("authors").drop();
  const callSeedAuthors = await seedAuthors();

  if (callSeedAuthors) {
    // seedBooks();
    mongoose.disconnect();
  }
});

const seedAuthors = async () => {
  const authors = generateAuthors();
  return new Promise((resolve, rejects) => {
    for (let i = 0; i <= authors.length - 1; i++) {
      authors[i].save((err, res) => {
        if (err) {
          return rejects({ error: err });
        }
        if (i === authors.length - 1) {
          // mongoose.disconnect();
          console.log("Done seeding author collections...");
          resolve("ok");
        }
      });
    }
  });
};
