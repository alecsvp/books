import { type BookInterface } from '../app'
import BookRepository from '../repository/BookRepository'
import { type NextFunction, type Request, type Response } from 'express'

export const identifyBookMiddleware = (request: Request, response: Response, next: NextFunction): void => {
  const book: BookInterface | undefined = (new BookRepository()).findOne(Number(request.params.id))

  if (book === undefined) {
    throw new Error('Cannot identify book')
  }

  next()
}

export const identifyCopiesMiddleware = (request: Request, response: Response, next: NextFunction): void => {
  const availableCopies = (new BookRepository()).countCopies(Number(request.params.id), true)

  if (availableCopies === 0) {
    throw new Error('No available book')
  }

  next()
}
