import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <div>
        Book
          <BookList />
          <AddBook />
        </div>
      </ApolloProvider>
    </div>
  );
}

export default App;