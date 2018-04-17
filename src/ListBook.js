import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListBook extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.props.updateBook) {
      this.props.updateBook(this.props.book, e.target.value)
      this.props.book.shelf = e.target.value
    }
  }

  render() {

    const { book } = this.props;

    return(
      <div className="book">
        <div className="book-top">
          {
            book.hasOwnProperty('imageLinks') && (
              <div className="book-cover" style={{ width: 128, height: 193,
                backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}>
              </div>
            )
          }
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={this.handleSubmit}>
              <option disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {
          book.hasOwnProperty('authors') && (
            book.authors.map((author) => (
              <div key={author} className="book-authors">{author}</div>
            ))
          )
        }
      </div>
    )

  }

}

export default ListBook
