const express = require('express');

const app = express();

app.use(express.static('app'));
app.get('/', (req, res) => {
  res.sendfile('./app/index.html');
});

app.listen(8000, () => {
  console.log('Server is running!');
});
