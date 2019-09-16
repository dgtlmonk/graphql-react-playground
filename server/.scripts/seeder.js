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

const init = async () => {
  try {
    // FIXME: place credentials in .env
    const connect = await mongoose.connect(
      "mongodb+srv://rw-user:6TfgNgyZG9buzWyn@react-graphql-lab01-rl2ok.mongodb.net/graphql-lab00",
      // "mongodb+srv://r-user:E3G6UTdKE21TpY7v@react-graphql-lab01-rl2ok.mongodb.net/graphql-lab00",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  } catch (e) {
    console.log(
      "Failed to access mongodb. Unable to connect (make sure  you have access permission)"
    );
  }
};

mongoose.connection.once("connected", async () => {
  console.log(
    chalk.greenBright("Info:"),
    "Connection to mongo cloud db accepted, seeding started ...."
  );
  console.log(chalk.greenBright("cleaning up collections..."));

  // TODO: Add error handling e.g. permission error
  const seeder = await Promise.all([
    dropCollection(`authors`),
    dropCollection(`books`),
    seedCollection(`authors`),
    seedCollection(`books`)
  ])
    .catch(e => {
      console.log("Error: ", e);
    })
    .finally(() => {
      mongoose.disconnect();
    });
});

// --- HELPERS ------
/**
 * @dropCollection drops a collection.
 * Prints warning on operation failure
 */
const dropCollection = async collection => {
  return new Promise(async (resolve, rejects) => {
    try {
      const authorCollectionDropped = await mongoose.connection
        .collection(`${collection}`)
        .drop();
    } catch (e) {
      // code 8000 is no permission
      if (e.code == 8000) {
        console.log(
          chalk.white.bgRed.bold("Error while "),
          `trying to drop collection ${collection}.  `
        );
        return rejects(`No permission.`);
      }

      console.log(
        chalk.white.bgGreen.bold("Warning: "),
        `trying to drop non-existent collection ${collection}. (non-fatal)`
      );
      // allow insert on other errors (collection doesn't exists yet)
      return resolve(`ok`);
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

  return new Promise(async (resolve, rejects) => {
    for (let i = 0; i <= collection.length - 1; i++) {
      const conn = await collection[i].save();

      if (!conn) {
        console.log(`Error seeding ${collectionName}. \n Error: ${err}`);
        rejects({ status: `fail`, error: err });
        break;
      }

      if (i === collection.length - 1) {
        console.log(
          chalk.greenBright(
            `Seeding ${chalk.blueBright(collectionName)} collection successful.`
          )
        );
        return resolve({ status: "success" });
      }
    }
  }).catch(e => {
    Promise.reject({ status: `fail` });
  });
};

init();
