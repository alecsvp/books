import { BOOKS, COPIES } from '../constants'
import { type BookInterface, type BookCopyInterface } from '../app'

export default class BookRepository {
  findOne (id: number): BookInterface | undefined {
    const books = BOOKS

    return books.find((book: BookInterface) => {
      return book.id === id
    })
  }

  countCopies (bookId: number, countAvailableCopies = false): number {
    const copies = COPIES

    let counter = 0

    copies.map((item: BookCopyInterface) => {
      if (item.bookId === bookId) {
        if (!countAvailableCopies || (countAvailableCopies && item.outDate === null)) {
          counter++
        }
      }

      return true
    })

    return counter
  }

  checkOut (bookId: number): BookCopyInterface {
    const copies: BookCopyInterface[] = COPIES

    let key = 0

    for (const copy of copies) {
      if (copy.bookId === bookId && copy.outDate === null) {
        COPIES[key].outDate = new Date().toISOString()

        return copy
      }

      key++
    }

    throw new Error('Cannot checkout any book')
  }

  checkIn (bookId: number): BookCopyInterface {
    const copies: BookCopyInterface[] = COPIES

    let key = 0

    // For this example, in order to checkin a book -> checkout first a book
    this.checkOut(bookId)

    // Checkin a Book
    for (const copy of copies) {
      if (copy.bookId === bookId && copy.outDate !== null) {
        COPIES[key].inDate = new Date().toISOString()
        COPIES[key].outDate = null

        return copy
      }

      key++
    }

    throw new Error('Cannot checkin any book')
  }
}
