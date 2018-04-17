export function filterShelf(books, shelf) {
     return books.filter(book => book.shelf.toLowerCase() === shelf.toLowerCase())
}
