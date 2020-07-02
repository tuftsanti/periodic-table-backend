const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 8000;
const axios = require('axios')

// AUTH MIDDLEWARE
// const jwt = require("express-jwt")
// const jwksRsa = require("jwks-rsa")

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// GET DATA FROM GITHUB API OR USE BACKUP FILE
const backupElements = require('./elements.js')
let elements = []
axios.get('https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json')
  .then(({data}) => {
    elements = Object.values(data.elements)
    // console.log(elements)
    // elements = data.map(element => element)
  })
  .catch(error => {
    console.log(`Couldn't reach the Element source API:\n`+error)
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
    const element = elements.find(element => element.number === elid);
    res.send(element);
});


app.get('/', (req, res) => {
  res.send(`Listening on port ${PORT}...`)
});

// listen on the port
app.listen(PORT);