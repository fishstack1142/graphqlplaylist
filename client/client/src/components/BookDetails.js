import React from 'react'
import { graphql } from 'react-apollo'
import { getBookQuery } from '../queries/queries'

function BookDetails(props) {

    console.log(props.data)

    return (
        <div id="book-details">
            {props.bookId}
            <br />

            {
                props.data.book ? (
                    <div>
                        <h2>{props.data.book.name}</h2>
                        <p>{props.data.book.genre}</p>
                        <p>{props.data.book.author.name}</p>
                        <p>all books by author</p>
                        <ul>
                            {props.data.book.author.books.map(item => {
                                return <li key={item.id}>{item.name}</li>
                            })}
                        </ul>

                    </div>
                ) : (<div>no book here</div>)
            }


        </div>
    )
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails)
