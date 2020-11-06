const express = require('express');
const axios = require('axios');

const app = express();
const port = 80;
app.use(express.json());

const proxyTo = async (url, req, res) => {
  const serviceResponse = await axios.request({
    url,
    method: req.method,
    data: req.body
  });
  res.json(serviceResponse.data);
}

app.route('/').get((req, res) => res.json({ service: 'gateway' }));

app.route('/basket').get(async (req, res) => {
  proxyTo("http://basket", req, res);
})

app.route('/catalog').get(async (req, res) => {
  proxyTo("http://catalog", req, res);
})

app.listen(port, () => {
  console.log('Server started on port: ' + port);
});
