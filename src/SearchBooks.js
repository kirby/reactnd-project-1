import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBook from './ListBook'
import PropTypes from 'prop-types';

class SearchBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
  }

  state = {
    searchedBooks: []
  }

  updateQuery = (query) => {

    if (query.length > 0) {
      BooksAPI.search(query).then((books) => {
        // check for error
        if (books.error) {
          this.setState(() => ({searchedBooks: []}))
        }

        // check books.length
        if (books && books.length > 0) {
          // const booksWithShelf = this.booksWithShelf(books)

          this.setState(() => (
            {searchedBooks: this.booksWithShelf(books)})
          )
        }

      })
    } else {
      this.setState(() => ({searchedBooks: []}))
    }
  }

  booksWithShelf = (searchedBooks) => {
    const {books} = this.props;
    searchedBooks.forEach(searchedBook => {
      const match = books.filter(book => book.id === searchedBook.id)
      if (match instanceof Array && match.length > 0) {
        searchedBook.shelf = match[0].shelf
      } else {
        searchedBook.shelf = 'none'
      }
    })

    return searchedBooks
  }

  render() {

    const {searchedBooks} = this.state;

    return (<div className="search-books">
      <div className="search-books-bar">
        <Link className='close-search' to='/'>
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" onChange={(event) => this.updateQuery(event.target.value)}/>
        </div>
      </div>
      {
        searchedBooks.length !== 0 && (<div className="search-books-results">
          <ol className="books-grid">
            {
              searchedBooks.map((book) => (<li key={book.id}>
                <ListBook book={book} updateBook={this.props.updateBook}/>
              </li>))
            }
          </ol>
        </div>)
      }

    </div>)
  }
}

export default SearchBooks
