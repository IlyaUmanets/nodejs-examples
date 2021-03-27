const express = require('express')
const app = express()
const port = 3000

const {convertCurrency} = require('./currency-converter.js')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/currency', (req, res) => {
  convertCurrency('USD', 'HRK', 20)
  .then((message) => {
    res.send(message)
  }).catch((error) => {
    res.send(error)
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
