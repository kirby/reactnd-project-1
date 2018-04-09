import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBook from './ListBook'
import PropTypes from 'prop-types';

class SearchBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
  }

  state = {
    books: []
  }

  updateQuery = (query) => {

    console.log('query = ' + query + ' [' + query.length + '] ')

    if (query.length > 0) {
      BooksAPI.search(query)
        .then((books) => {
          console.log(books)
          // check for error
          if (books.error) {
            console.log(books.error)
            this.setState(() => ({
              books: []
            }))
          }

          // check books.length
          if (books && books.length > 0) {
            console.log('books.length = ' + books.length)
            this.setState(() => ({
              books
            }))
          }

        })
    } else {
      this.setState(() => ({
        books: []
      }))
    }
  }

  clearQuery = () => {
    this.updateQuery('')
  }

  render() {

    const { books } = this.state;
    console.log('books: ' + books)

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className='close-search'
            to='/'>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        {books.length !== 0 && (
          <div className="search-books-results">
            <ol className="books-grid">
              {
                books.map((book) => (
                  // <li key={book.id}>{book.name}</li>
                  <li key={book.id}>
                    <ListBook book={book} updateBook={this.props.updateBook} />
                  </li>
                ))
              }
            </ol>
          </div>
        )}

      </div>
    )
  }
}

export default SearchBooks
