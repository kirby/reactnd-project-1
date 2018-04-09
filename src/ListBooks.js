import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ListBook from './ListBook';

class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
  }

  render() {

    const { books, updateBook } = this.props;

    // TODO: iterate over shelves
    const shelves = [
      { category: 'currentlyReading', name: 'Currently Reading' },
      { category: 'wantToRead', name: 'Want To Read' },
      { category: 'read', name: 'Read' },
    ]

    const currentlyReading = books.filter((book) => (
      book.shelf.toLowerCase() === 'currentlyReading'.toLowerCase()
    ))

    const wantToRead = books.filter((book) => (
      book.shelf.toLowerCase() === 'wantToRead'.toLowerCase()
    ))

    const read = books.filter((book) => (
      book.shelf.toLowerCase() === 'read'.toLowerCase()
    ))

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>

            {/* // TODO: iterate over shelves */}

            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReading.map((book) => (
                    <li key={book.id}>
                      <ListBook book={book} updateBook={updateBook}/>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToRead.map((book) => (
                    <li key={book.id}>
                      <ListBook book={book} updateBook={updateBook} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {read.map((book) => (
                    <li key={book.id}>
                      <ListBook book={book} updateBook={updateBook} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <Link
          to="/search"
          className='open-search'
        >Add a book</Link>
      </div>
    )

  }
}

export default ListBooks
