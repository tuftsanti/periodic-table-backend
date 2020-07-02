const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const elements = 
[
  {
    id: 1,
    name: 'Charity Ball',
    category: 'Fundraising',
    description: 'Spend an elegant night of dinner and dancing with us as we raise money for our new rescue farm.',
    featuredImage: 'https://placekitten.com/500/500',
    images: [
      'https://placekitten.com/500/500',
      'https://placekitten.com/500/500',
      'https://placekitten.com/500/500',
    ],
    location: '1234 Fancy Ave',
    date: '12-25-2019',
    time: '11:30'
  },
  {
    id: 2,
    name: 'Rescue Center Goods Drive',
    category: 'Adoptions',
    description: 'Come to our donation drive to help us replenish our stock of pet food, toys, bedding, etc. We will have live bands, games, food trucks, and much more.',
    featuredImage: 'https://placekitten.com/500/500',
    images: [
      'https://placekitten.com/500/500'
    ],
    location: '1234 Dog Alley',
    date: '11-21-2019',
    time: '12:00'
  }
];

app.get('/elements', (req, res) => {
    res.send(elements);
  });

app.get('/elements/:id', (req, res) => {
    const id = Number(req.params.id);
    const element = elements.find(element => element.id === id);
    res.send(element);
});


app.get('/', (req, res) => {
  res.send(`Listening on port ${PORT}...`)
});

// listen on the port
app.listen(PORT);