import { type RequestHandler } from 'express'
import { BOOKS } from '../constants'
import BookRepository from '../repository/BookRepository'

export const list: RequestHandler = (req, res, next) => {
  res.json({
    response: BOOKS,
    success: true
  })
}

export const copies: RequestHandler = (req, res, next) => {
  res.json({
    response: (new BookRepository()).countCopies(Number(req.params.id)),
    success: true
  })
}

export const checkout: RequestHandler = (req, res, next) => {
  res.json({
    response: (new BookRepository()).checkOut(Number(req.params.id)),
    success: true
  })
}

export const checkin: RequestHandler = (req, res, next) => {
  res.json({
    response: (new BookRepository()).checkIn(Number(req.params.id)),
    success: true
  })
}
