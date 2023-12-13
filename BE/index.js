const express = require('express')
const Cors = require('cors')
const RegisterRoute = require('./api/routes/register')
const UserRoute = require('./api/routes/login')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(Cors())

app.use('/api', UserRoute)
app.use('/api', RegisterRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`listening to port no : ${PORT}`)
})
