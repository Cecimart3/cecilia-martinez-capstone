const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 8080

app.use(express.json())
app.use(cors())

const resultsRoute = require('./routes/results')
app.use('/results', resultsRoute)

app.listen(PORT, () => console.log('Locked and Loaded'))