const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

morgan.token('phoneNumberData', (req, res) => JSON.stringify(req.body))

const app = express()

app.use(bodyParser.json())

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :phoneNumberData'
  )
)

let phoneNumbers = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '045-1236543'
  },
  {
    id: 2,
    name: 'Arto Järvinen',
    number: '041-21423123'
  },
  {
    id: 3,
    name: 'Lea Kutvonen',
    number: '040-4323234'
  },
  {
    id: 4,
    name: 'Martti Tienari',
    number: '09-784232'
  }
]

app.get('/api/persons', (req, res) => {
  res.json(phoneNumbers)
})

app.get('/info', (req, res) => {
  const date = new Date()

  res.send(
    `<p>Puhelinluettelossa on ${
      phoneNumbers.length
    } henkilön tiedot</p> <p>${date}</p>`
  )
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const phoneNumber = phoneNumbers.find(num => num.id === id)

  phoneNumber ? res.json(phoneNumber) : res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  phoneNumbers = phoneNumbers.filter(num => num.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  let id = null
  do {
    id = Math.floor(Math.random() * 100 + 1)
  } while (phoneNumbers.find(num => num.id === id))

  const name = req.body.name
  const number = req.body.number

  if (!name || !number) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  if (phoneNumbers.find(num => num.name === name)) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const phoneNumber = {
    id,
    name,
    number
  }

  phoneNumbers = phoneNumbers.concat(phoneNumber)

  res.json(phoneNumber)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
