const express = require('express')
// if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") require("dotenv").config()
const app = express()
const cors = require('cors')
// const Controller = require('./controllers')
// const { authentic, authorize } = require('./middlewares/credentials')
// const errorHandler =  require('./middlewares/errorHandler')
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// app.post('/register', Controller.register)
// app.post('/login', Controller.login)
// app.get('/inventories', authentic, authorize, Controller.fetch)

// app.use(errorHandler)

// app.listen(PORT, () => {
// console.log('nyala: http://localhost' + PORT);
// })

module.exports = app



