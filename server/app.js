import mongoose from 'mongoose';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema/schema';

const port = 4000;
const app = express();

app.use(cors());
// FIXME: place credentials in .env
mongoose.connect(
  `mongodb+srv://rw-user:6TfgNgyZG9buzWyn@react-graphql-lab01-rl2ok.mongodb.net/graphql-lab00`,
  {useNewUrlParser: true, useUnifiedTopology: true},
);

// FIXME: add err handler
mongoose.connection.once(`open`, () => {
  // eslint-disable-next-line no-console
  console.log(`connection to mlab is now open`);
});

app.use(`/graphql`, graphqlHTTP({schema, graphiql: true}));
// eslint-disable-next-line no-console
app.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(`GraphQL listening to port ${port}`),
);
