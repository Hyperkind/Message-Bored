const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
// const router = express.Router();

const apiRouter = require('./routes');

const db = require('./models');

app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/api', apiRouter);

// app.use('/', function (req, res) {
//   res.send('Hello world!!!!!!');
// });

app.get('*', (req, res) => {
  res.sendFile('./public/index.html', { root: __dirname });
});

app.listen(PORT, () => {
  console.log('server now listening on port', PORT);
  // db.sequelize.drop();
  // db.sequelize.sync({force: true});
});
