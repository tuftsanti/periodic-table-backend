const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 8000;

// AUTH MIDDLEWARE
// const jwt = require("express-jwt")
// const jwksRsa = require("jwks-rsa")

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const elements = require('./elements.js')

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

// const elements = 
// [
//   {
//     id: 1,
//     name: 'Charity Ball',
//     category: 'Fundraising',
//     description: 'Spend an elegant night of dinner and dancing with us as we raise money for our new rescue farm.',
//     featuredImage: 'https://placekitten.com/500/500',
//     images: [
//       'https://placekitten.com/500/500'
//     ],
//     location: '1234 Fancy Ave',
//     date: '12-25-2019',
//     time: '11:30'
//   },
//   {
//     id: 2,
//     name: 'Rescue Center Goods Drive',
//     category: 'Adoptions',
//     description: 'Come to our donation drive to help us replenish our stock of pet food, toys, bedding, etc. We will have live bands, games, food trucks, and much more.',
//     featuredImage: 'https://placekitten.com/500/500',
//     images: [
//       'https://placekitten.com/500/500'
//     ],
//     location: '1234 Dog Alley',
//     date: '11-21-2019',
//     time: '12:00'
//   }
// ];

app.get('/elements', (req, res) => {
    // res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict"),
    res.send(elements);
  });

app.get('/elements/:id', /*checkJwt,*/ (req, res) => {
    const elid = Number(req.params.id);
    const element = elements.find(element => element.id === elid);
    res.send(element);
});


app.get('/', (req, res) => {
  res.send(`Listening on port ${PORT}...`)
});

// listen on the port
app.listen(PORT);