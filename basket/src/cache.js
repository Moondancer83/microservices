const redis = require('redis');
const util = require('util');

const cache = redis.createClient({
  host: process.env.CACHE_HOST,
  port: process.env.CACHE_PORT
});

cache.on('error', console.error)

cache.get = util.promisify(cache.get);

module.exports = cache;