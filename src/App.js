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
        console.log('componentDidMount\n' + books)
        this.setState(() => ({
          books
        }))
      })
  }

  moveBookToShelf(book, shelf) {
    console.log('moveBookToShelf: ' + book.title + ', ' + shelf)
    BooksAPI.update(book, shelf)
      .then((books) => {
        // console.log(books)
        // this.setState(() => ({
        //   books
        // }))
        BooksAPI.getAll()
          .then((books) => {
            this.setState(() => ({
              books
            }))
          })
      })
  }

  render() {
    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            onMoveBook={this.moveBookToShelf}
          />
        )} />

        <Route path='/search' render={() => (
          <SearchBooks onMoveBook={this.moveBookToShelf}/>
        )} />

      </div>
    )
  }
}

export default BooksApp
