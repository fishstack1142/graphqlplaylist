import React from 'react'
import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'

const getBooksQuery = gql`
{
    books {
        name
        id
    }
}
`

function BookList(props) {

    return (
        <div>
            
            <ul id="book-list">
            {
                props.data.loading ? <div>loading...</div> :
                (props.data.books.map(book => {
                    return (<li key={book.id}>{book.name}</li>)
                }))
            }
            </ul>
        </div>
    );
}

export default graphql(getBooksQuery)(BookList)
