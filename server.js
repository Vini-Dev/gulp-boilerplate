const express = require('express');

const app = express();

app.use(express.static('src'));
app.get('/', (req, res) => {
  res.sendfile('./src/index.html');
});

app.listen(8000, () => {
  console.log('Server is running!');
});
