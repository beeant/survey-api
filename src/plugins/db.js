import fs from "fs";
import Sequelize from 'sequelize';
import path from "path";
import JoiSequelize from "joi-sequelize";

const {
  MYSQL_PASSWORD,
  MYSQL_USERNAME,
  MYSQL_HOST,
  MYSQL_DATABASE,
  MYSQL_PORT,
} = process.env;

exports.plugin = {
  name: "db",
  register: (plugin) => {
    const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD, {
      host: MYSQL_HOST,
      dialect: 'mysql',
      port: MYSQL_PORT,
      native: true,
      logging: false,
      maxConcurrentQueries: 200,
      pool: {
        maxConnections: 100,
        minConnections: 50,
      },
      dialectOptions: {
        charset: 'utf8mb4',
      },
    });

    const modelsDir = `${__dirname}/../models`;

    const allModels = {};
    const jois = {};

    fs
      .readdirSync(modelsDir)
      .filter(file => file.indexOf('.js') !== 0)
      .forEach((file) => {
        const model = require(path.join(modelsDir, file))(sequelize, Sequelize.DataTypes);
        allModels[model.name] = model;
        jois[model.name] = new JoiSequelize(require(path.join(modelsDir, file)));
      });

    Object.keys(allModels).forEach((modelName) => {
      if ('associate' in allModels[modelName]) {
        allModels[modelName].associate(allModels);
      }
    });

    plugin.expose("sequelize", sequelize);
    plugin.expose("Sequelize", Sequelize);
    sequelize.sync({});
    plugin.expose('models', allModels);
    plugin.expose('jois', jois);
  },
};
