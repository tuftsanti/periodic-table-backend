const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;
const axios = require('axios');
const mongoose = require('mongoose')
require('dotenv').config()
// const Element = require('./models/elements.js')

const elementsController = require('./controllers/elements.js')
const db = mongoose.connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'

// AUTH MIDDLEWARE
// const jwt = require("express-jwt")
// const jwksRsa = require("jwks-rsa")

// Whitelist localhost
const whitelist = [
  'http://localhost:8080',
  'http://localhost:8000',
  'https://andys-periodic-table.herokuapp.com/'
]

// CORS middleware
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
let elements = []
let forSeed = []
// console.log(`Elements is: ${typeof(elements)}`)
// axios.get('https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json')
axios.get('https://neelpatel05.pythonanywhere.com/xx')
  .then(({data}) => {
    // elements = Object.values(data.elements)
    elements = data
    // forSeed = JSON.stringify(elements)
    // console.log(forSeed)
    // console.log(elements, typeof(elements))
    // console.log(data)
    // console.log(`Elements is: ${typeof(elements)}`)
    // elements = data.map(element => element)
    db.collections['elements'].drop( function(err) {
      console.log('elements dropped');
    });
    db.collections['elements'].insertMany(elements, function(err) {
      console.log('elements added');
    })
  })
  .catch(error => {
    console.log(`Couldn't reach the element source API at Github:\n`+error)
    elements = backupElements
    db.collections['elements'].drop( function(err) {
      console.log('elements dropped');
    });
    db.collections['elements'].insertMany(elements, function(err) {
      console.log('elements added');
    })
  })
//// TESTING SEEDING DATABASE
// const resetDatabase = () => {
//     db.collections['elements'].drop( function(err) {
//       console.log('elements dropped');
//     });
//   }
// // resetDatabase()
// const setDatabase = () => {
//   // console.log(typeof(forSeed))
//   db.collections['elements'].insertMany(elements, function(err) {
//     console.log('elements added');
//   })
// }
// setDatabase()
// console.log(elements)

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

// SEEDING DB
for (item in elements) {
app.post('/', async (req, res) => {
  try {
      const newElement = {...req.body}
      // console.log(newElement)
      const createdElement = await Element.create(newElement)
      res.status(200).json(createdElement)
  } catch(error) {
      res.status(400).json(error)
  }
})
}

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