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

app.route('/basket').get((req, res) => proxyTo('http://basket', req, res).catch(console.error));
app.route('/basket/set-item').patch((req, res) => proxyTo('http://basket/set-item', req, res).catch(console.error));
app.route('/basket/show').get((req, res) => proxyTo('http://basket/show', req, res).catch(console.error));
app.route('/basket/clear').delete((req, res) => proxyTo('http://basket/clear', req, res).catch(console.error));

app.route('/catalog').get((req, res) => proxyTo('http://catalog', req, res).catch(console.error));
app.route('/catalog/product').get((req, res) => proxyTo('http://catalog/product', req, res).catch(console.error));
app.route('/catalog/product/:id').get((req, res) => proxyTo(`http://catalog/product/${req.params.id}`, req, res).catch(console.error));
app.route('/catalog/product/:id').patch((req, res) => proxyTo(`http://catalog/product/${req.params.id}`, req, res).catch(console.error));

app.listen(port, () => {
  console.log('Server started on port: ' + port);
});
