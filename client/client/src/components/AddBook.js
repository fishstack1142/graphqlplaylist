import React, { useState } from "react";
import { gql } from "apollo-boost";
import { graphql, compose } from 'react-apollo';

import { addBookMutation, getBooksQuery } from "../queries/queries";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

function AddBook(props) {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const submitForm = e => {
    e.preventDefault();

    console.log(name);
    console.log(genre);
    console.log(authorId);
    props.addBookMutation({
        variables: {
            name,
            genre,
            authorId
        },
        refetchQueries: [{query: getBooksQuery}]
    })
  };

  return (
    <div>
      <form id="add-book" onSubmit={submitForm}>
        <div className="field">
          <label htmlFor="">Book name:</label>
          <input type="text" onChange={e => setName(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="">Genre:</label>
          <input type="text" onChange={e => setGenre(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="">Author:</label>
          <select onChange={e => setAuthorId(e.target.value)}>
            <option>Select author</option>
            {props.getAuthorsQuery.loading ? (
              <option disabled>loading authors</option>
            ) : (
              props.getAuthorsQuery.authors.map(author => {
                return (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                );
              })
            )}
          </select>
        </div>

        <button>+</button>
      </form>
    </div>
  );
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);
