require('dotenv').config()
const http = require('http')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const hostname = '127.0.0.1'
const port = process.env.PORT
const user = process.env.MONGO_USER
const pass = process.env.MONGO_PASS
const cluster = process.env.MONGO_CLUSTER
const db = process.env.MONGO_DB

//connection à notre cluster avec les infos qui proviennent du .env
// https://mongoosejs.com/
mongoose.connect(`mongodb+srv://${user}:${pass}@${cluster}/${db}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// import des routes depuis ./routes/
const billsRoutes = require('./routes/bills')
const clientsRoutes = require('./routes/clients')

const app = express()

// permet de transformer le body de la requête en json automatiquement
app.use(express.json())

// attention, l'ordre est important
// d'abord on vérifie la sécurité avec cors
app.use(cors({
  origin: 'http://127.0.0.1:5173'
}))

// configure les routes
app.use('/bills', billsRoutes)
app.use('/clients', clientsRoutes)

// route principale
app.get('/', (req, res) => {
  res.json({
    api: 'bills app api',
    version: process.env.VERSION
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})