require("dotenv").config()
const express = require("express")
const router = require("./router")
const errorHandler = require("./middlewares/errorHandler")
const cors = require('cors')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(router)
app.use(errorHandler)


app.listen(PORT, () =>
  console.log("Server is started at http://localhost:" + PORT)
)
