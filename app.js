const express = require('express')
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") require("dotenv").config()
const app = express()
const cors = require('cors')
const index = require('./routes')
const errorHandler =  require('./middlewares/errorHandler')
const os = require('os')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World, Server Kang Cukur Active, with os: ' + os.type())
})
app.use("/", index)
app.use(errorHandler)



module.exports = app