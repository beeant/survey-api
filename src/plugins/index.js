import HapiSwagger from "hapi-swagger";

import Pack from '../../package.json';

const getDir = path => `${__dirname}/${path}`;

const serverPlugins = (/*server*/) => {
  return [{
    plugin: require('@hapi/good'),
    options: {
      ops: {
        interval: 1000,
      },
      reporters: {
        myConsoleReporter: [{
          module: '@hapi/good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', response: '*' }],
        }, {
          module: '@hapi/good-console',
        },
        'stdout',
        ],
      },
    },
  }, {
    plugin: require("@hapi/inert"),
  }, {
    plugin: require("@hapi/vision"),
  }, {
    plugin: HapiSwagger,
    options: {
      basePath: "/",
      pathPrefixSize: "1",
      documentationPath: "/docs",
      reuseDefinitions: false,
      info: {
        title: "Survey API",
        version: Pack.version,
      },
    },
  }, {
    plugin: require(getDir('auth')),
  }, {
    plugin: require(getDir('db')),
  }, {
    plugin: require(getDir('errors')),
  }, {
    plugin: require(getDir('api')),
  }, {
    plugin: require(getDir("redis")),
  }];
};

module.exports = {
  plugins: null,
  init: server => serverPlugins(server),
};

