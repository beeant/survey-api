import survey from "./survey";
import auth from "./auth";
import audience from "./audience";

import requests from "../lib/validations/requests";
import responses from "../lib/validations/responses";
import commons from "../lib/validations/commons";

export default (plugin) => {
  const {
    plugins: {
      db: {
        jois,
      },
    },
  } = plugin;

  const commonValidations = commons(jois);
  const validations = {
    requests: requests(jois, commonValidations),
    responses: responses(jois, commonValidations),
    commons: commonValidations,
  };

  return [
    ...auth(plugin, validations),
    ...survey(plugin, validations),
    ...audience(plugin, validations),
  ];
};
