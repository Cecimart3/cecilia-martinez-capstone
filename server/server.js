const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 8080

app.use(express.json())
app.use(cors())

app.listen(PORT, () => console.log('Locked and Loaded'))