const express = require('express');
const app = express();

const { config } = require('./config');
const moviesApi = require('./routes/movies');

const {
  logErrors,
  errorHandler
} = require('./utils/middleware/errorHandlers.js');

// body parser
app.use(express.json());

moviesApi(app);

app.use(logErrors);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/json', (req, res) => {
  res.send({ hello: 'world' });
});

app.get('/year/:year', (req, res) => {
  // console.log()
  const year = req.params.year;
  const isleapYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  res.send(
    `El año ${year} ${
      isleapYear ? 'es bisiesto' : 'NO es bisiesto'
    }`
  );
});

app.listen(config.port, () => {
  console.log('Listening', {
    url: `Listening to port http://localhost:${config.port}`
  });
});
