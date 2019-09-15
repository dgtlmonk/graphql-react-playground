import Book from "../models/book";
import Author from "../models/author";
import { getObjectId } from "./helper";
import mongoose from "mongoose";
import chalk from "chalk";

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
  console.log(chalk.greenBright("Info:"), "Seeding authors collection ...");

  return authorsNames.map(
    author => new Author({ _id: getObjectId(author), name: author, books: [] })
  );
};

export const generateBooks = () => {
  console.log(chalk.greenBright("Info:"), "Seeding books collection ...");
  return bookNames.map(
    book =>
      new Book({
        name: book,
        authorId: getObjectId(
          authorsNames[Math.ceil(Math.random() * authorsNames.length - 1)]
        ),
        genre: genres[Math.ceil(Math.random() * genres.length - 1)]
      })
  );
};

// FIXME: place credentials in .env
mongoose.connect(
  "mongodb+srv://dgtlmonk00:joufpIC2NFkmE4lS@react-graphql-lab01-rl2ok.mongodb.net/graphql-lab00",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.once("open", async () => {
  console.log(
    chalk.greenBright("Info:"),
    "Connection to mongo cloud db accepted, seeding started ...."
  );
  console.log(chalk.greenBright("cleaning up collections..."));

  await dropCollection("authors");
  await dropCollection("books");

  const seeder = await Promise.all([
    seedCollection(`authors`),
    seedCollection(`books`)
  ]);

  if (seeder) {
    mongoose.disconnect();
  }
});

// --- HELPERS ------
/**
 * @dropCollection drops a collection.
 * Prints warning if collection doesnt exists
 */
const dropCollection = async collection => {
  return new Promise(async (resolve, rejects) => {
    try {
      const authorCollectionDropped = await mongoose.connection
        .collection(`${collection}`)
        .drop();
    } catch (e) {
      console.log(
        chalk.white.bgRed.bold("Warning:"),
        `trying to drop non-existent collection ${collection}`
      );
    } finally {
      resolve({ status: "ok" });
    }
  });
};

const seedAuthors = async () => {
  const authors = generateAuthors();
  return new Promise((resolve, rejects) => {
    for (let i = 0; i <= authors.length - 1; i++) {
      authors[i].save((err, res) => {
        if (err) {
          rejects({ error: err });
        }
        if (i === authors.length - 1) {
          console.log(
            chalk.greenBright("Seeding author collection successful.")
          );
          resolve({ status: "ok" });
        }
      });
    }
  });
};

const seedCollection = async collectionName => {
  let collection = [];

  if (collectionName === "books") {
    collection = generateBooks();
  } else {
    collection = generateAuthors();
  }

  return new Promise((resolve, rejects) => {
    for (let i = 0; i <= collection.length - 1; i++) {
      collection[i].save((err, res) => {
        if (err) {
          rejects({ status: `fail`, error: err });
        }

        if (i === collection.length - 1) {
          console.log(
            chalk.greenBright(
              `Seeding ${chalk.blueBright(
                collectionName
              )} collection successful.`
            )
          );
          resolve({ status: "ok" });
        }
      });
    }
  });
};
