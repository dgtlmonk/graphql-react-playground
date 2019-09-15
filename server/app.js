import mongoose from "mongoose";
import schema from "./schema/schema";

const express = require("express");
const graphqlHTTP = require("express-graphql");

const port = 4000;
const app = express();

// FIXME: place credentials in .env
mongoose.connect(
  "mongodb+srv://dgtlmonk00:joufpIC2NFkmE4lS@react-graphql-lab01-rl2ok.mongodb.net/graphql-lab00",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// FIXME: add err handler
mongoose.connection.once("open", () => {
  // eslint-disable-next-line no-console
  console.log("connection to mlab is now open");
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`GraphQL listening to port ${port}`));
