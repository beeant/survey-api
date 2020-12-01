import api from "../api";

const auth = (request, reply) => {
  if (!request.auth.credentials.id) {
    reply({auth: false});
  } else {
    reply.continue();
  }
};

const API = (plugin) => {
  api(plugin, auth).forEach((api) => {
    plugin.route(api);
  });
};

exports.plugin = {
  name: "api",
  register: API,
};
