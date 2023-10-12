import express from 'express'

import { list, copies, checkout, checkin } from '../controllers/books'
import {
  identifyBookMiddleware,
  identifyCopiesMiddleware
} from '../middleware/identifyBookAndCopies'

export const booksRoute = express.Router()

booksRoute.get('/books/:id/copies', identifyBookMiddleware, copies)
booksRoute.patch('/books/:id/checkout', identifyBookMiddleware, identifyCopiesMiddleware, checkout)
booksRoute.patch('/books/:id/checkin', identifyBookMiddleware, identifyCopiesMiddleware, checkin)
booksRoute.get('/books/', list)
