const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const app = express();

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@graphql-basic.pmnob.gcp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  { useUnifiedTopology: true, useNewUrlParser: true }
);

mongoose.connection.once("open", () => {
  console.log("connected to mongo atlas in the clous as a service");
});

// bind express with graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
