const axios = require('axios');
const cache = require('./cache');

async function getProduct (productId) {
  try {
    const replay = await cache.get(productId);

    if (replay) {
      console.log(`Product ${productId} loaded from cache`)
      return JSON.parse(replay);
    }
    const serviceResponse = await axios.get(`http://catalog/product/${productId}`);
    const product = serviceResponse.data;
    console.log(`Product ${productId} loaded from service`)

    cache.set(productId, JSON.stringify(product));

    return product;
  } catch (e) {
    console.error(`Calling http://catalog/product/${productId} failed`, e);
  }
}

async function hydrateItem (productId, count) {
  const product = await getProduct(productId);
  return ({product, count});
}

module.exports = basket => {
  Promise.all(Object.keys(basket).map(productId => hydrateItem(productId, basket[productId])));
}