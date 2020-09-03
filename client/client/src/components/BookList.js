import React,  { useState } from 'react'
// import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'

import {getBooksQuery} from '../queries/queries'

import BookDetails from './BookDetails'

// const getBooksQuery = gql`
// {
//     books {
//         name
//         id
//     }
// }
// `

function BookList(props) {

    const [selected, setSelected] = useState(null);


    return (
        <div>
            
            <ul id="book-list">
            {
                props.data.loading ? <div>loading...</div> :
                (props.data.books.map(book => {
                    return (<li key={book.id} onClick={(e) => {setSelected(book.id)}} >{book.name}</li>)
                }))
            }
            </ul>
            <BookDetails bookId={selected} />
        </div>
    );
}

export default graphql(getBooksQuery)(BookList)
