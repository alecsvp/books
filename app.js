const express = require('express')

books = require('./routes/books')

const port = 3000
const app = module.exports = express()
app.get('/', (req, res) => {
  res.send('Hello World!!')
})

app.map = function (a, route) {
  route = route || ''

  for (const key in a) {
    switch (typeof a[key]) {
      // { '/path': { ... }}
      case 'object':
        app.map(a[key], route + key)
        break

      case 'function':
        app[key](route, a[key])
        break
    }
  }
}

app.map({
  '/books': {
    get: books.findAll

  }
})

app.listen(port, () => {
  console.log(`Running on  ${port}`)
})
