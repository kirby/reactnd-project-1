import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListBook from './ListBook';

class Shelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    updateBook: PropTypes.func.isRequired
  }

  render() {

    const { books, title, updateBook } = this.props;

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <ListBook book={book} updateBook={updateBook}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )

  }

}

export default Shelf
