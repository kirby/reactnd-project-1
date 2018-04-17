import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { filterShelf } from './utils.js'
import Shelf from './Shelf'

class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
  }

  render() {

    const { books, updateBook } = this.props;

    const currentlyReading = filterShelf(books, 'currentlyReading')
    const wantToRead = filterShelf(books, 'wantToRead')
    const read = filterShelf(books, 'read')

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <Shelf books={currentlyReading} title='Currently Reading' updateBook={updateBook} />
            <Shelf books={wantToRead} title='Want to Read' updateBook={updateBook} />
            <Shelf books={read} title='Read' updateBook={updateBook} />
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
