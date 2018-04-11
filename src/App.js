import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import { Route } from 'react-router-dom'
import './App.css'

class BooksApp extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        BooksAPI.getAll().then(books => {
          this.setState({ books })
        })
      })
  }

  render() {
    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            updateBook={this.updateBook}
          />
        )} />

        <Route path='/search' render={() => (
          <SearchBooks
            books={this.state.books}
            updateBook={this.updateBook}/>
        )} />

      </div>
    )
  }
}

export default BooksApp
