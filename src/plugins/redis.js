import redis from 'redis';
import Bluebird from "bluebird";

Bluebird.promisifyAll(redis);

const {
  REDIS_PASS,
  REDIS_PORT,
  REDIS_HOST,
  REDIS_PREFIX,
} = process.env;

exports.plugin = {
  name: "redis",
  multiple: true,
  register: (plugin) => {
    const redisClient = redis.createClient(
      REDIS_PORT,
      REDIS_HOST, {
        auth_pass: REDIS_PASS,
        prefix: REDIS_PREFIX,
      },
    );

    redisClient.on('error', (err) => {
      console.log(err);
    });

    const expose = {
      client: redisClient,
      set: (key, val, expiry) => (
        expiry ? redisClient.setAsync(key, JSON.stringify(val), "EX", expiry) : redisClient.setAsync(key, JSON.stringify(val))
      ),
      get: key => redisClient.getAsync(key).then(result => JSON.parse(result)),
    };

    plugin.expose('client', expose.client);
    plugin.expose('set', expose.set);
    plugin.expose('get', expose.get);
  },
};
