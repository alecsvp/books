import express, { type Express, type Request, type Response, type NextFunction } from 'express'
import { booksRoute } from './routes/books'
const app: Express = express()
const port = 30000

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

const router = express.Router()

app.use(booksRoute)

export interface BookInterface {
  id: number
  title: string
  name: string
}

export interface BookCopyInterface {
  id: number
  bookId: number
  outDate: null | string
  inDate: null | string
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ response: err.message, success: false })
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
