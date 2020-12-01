import Hapi from "@hapi/hapi";
import qs from "qs";
import dotenv from "dotenv";

import plugins from "./src/plugins";

const dotenvPath = "./.env";
dotenv.config({
  path: dotenvPath,
});

const {
  PORT,
  SERVER_HOST,
} = process.env;

const server = Hapi.server({
  port: PORT,
  host: SERVER_HOST,
  query: {
    parser: (query) => qs.parse(query, {allowDots: true}),
  },
  routes: {
    cors: {
      origin: ['*'],
      credentials: true,
      additionalExposedHeaders: ['Authorization'],
    },
    //true, //cors || true,
    validate: {
      options: {
        abortEarly: false,
      },
      failAction: (request, h, err) => {
        throw err;
      },
    },
    security: {
      xss: true,
      xframe: {
        rule: "allow-from",
        source: "http://localhost:8081",
      },
    },
    timeout: {
      server: 10 * 10000,
    },
  },
  debug: {
    request: ['error', 'uncaught'],
  },
});

export const init = async () => {
  const serverPlugins = plugins.init(server);
  await server.register(serverPlugins);
  await server.initialize();
  return server;
};

export const start = async () => {
  const serverPlugins = plugins.init(server);
  await server.register(serverPlugins);
  try {
    await server.start();
    console.log('Server running on %s', server.info.uri);
  } catch (err) {
    console.log("Error starting server", err);
  }
  return server;
};

process.on('unhandledRejection', (err) => {
  console.log("unhandledRejection", err);
  process.exit(1);
});

start();
