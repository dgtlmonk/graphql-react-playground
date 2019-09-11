import schema from "./schema/schema";
const express = require("express");
const graphqlHTTP = require("express-graphql");
const port = 4000;
const app = express();

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(port, () => console.log(`GraphQL listening to port ${port}`));
