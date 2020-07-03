const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;
const axios = require('axios');
const mongoose = require('mongoose')
require('dotenv').config()

const elementsController = require('./controllers/elements.js')
const db = mongoose.connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'

// AUTH MIDDLEWARE
// const jwt = require("express-jwt")
// const jwksRsa = require("jwks-rsa")

// Whitelist localhost
const whitelist = [
  'http://localhost:8080',
  'http://localhost:8000'
]

// Object to Configure CORS middleware
const corsOptions = {
  origin: function (origin, callback) {
      if (whitelist.indexOf (origin) !== -1) {
          callback(null, true)
      } else {
          callback(new Error('Not allowed by CORS'))
      }
  }
}

////////////////
/// DATABASE CONNECT
////////////////
mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
})
db.on('open', ()=> {
  console.log('Mongo is Connected')
})

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/elements/', elementsController)

// GET DATA FROM GITHUB API OR USE BACKUP FILE
const backupElements = require('./elements-array.js')
let elements = {}
// console.log(`Elements is: ${typeof(elements)}`)
// axios.get('https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json')
axios.get('https://neelpatel05.pythonanywhere.com/')
  .then(({data}) => {
    // elements = Object.values(data.elements)
    elements = data
    // console.log(data)
    // console.log(`Elements is: ${typeof(elements)}`)
    // elements = data.map(element => element)
    
  })
  .catch(error => {
    console.log(`Couldn't reach the element source API at Github:\n`+error)
    elements = backupElements
  })

// // AUTH CONFIG
// const authConfig = {
//     domain: "ariecker.us.auth0.com",
//     audience: "https://express-api"
//   };

// const checkJwt = jwt({
// // Provide a signing key based on the key identifier in the header and the signing keys provided by your Auth0 JWKS endpoint.
// secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
// }),

// // Validate the audience (Identifier) and the issuer (Domain).
// audience: authConfig.audience,
// issuer: `https://${authConfig.domain}/`,
// algorithms: ["RS256"]
// });

app.get('/elements', (req, res) => {
    // res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict"),
    res.send(elements);
  });

app.get('/elements/:id', /*checkJwt,*/ (req, res) => {
    const elid = Number(req.params.id);
    // console.log(elid)
    const element = elements.find(element => element.atomicNumber === elid);
    res.send(element);
});


app.get('/', (req, res) => {
  // res.send(`Listening on port ${PORT}...`)
  res.redirect('/elements')
});

// listen on the port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
});