const express = require('express')
const app = express()

const phoneNumbers = [
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

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
