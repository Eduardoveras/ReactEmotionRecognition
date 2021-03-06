const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(`${__dirname}/dist/`));
app.use('/src/assets', express.static(`${__dirname}/src/assets/`));
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '/dist/', 'index.html'));
});


app.listen(process.env.PORT || 8080);
