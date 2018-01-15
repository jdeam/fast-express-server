let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let PORT = process.env.PORT || 3000;
let app = express();

app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'Pong!' });
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found!' });
});

app.use((err, req, res, next) => {
  let error = err.status || 500;
  res.status(error).json({ error: err });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} ...`);
});
