import Boom from "@hapi/boom";

exports.plugin = {
  name: "errors",
  register: (plugin) => {
    const Errors = {
      messages: {
        unexpected: "Unexpected Error",
      },
    };

    // internal error
    Errors.internal = ({
      id,
      detail = "Server Error",
      key,
      meta,
      statusCode = 500,
    }) => {
      const boom = Boom.badImplementation(detail);
      boom.output.payload = {
        error: "internal",
        id,
        detail,
        key,
        meta,
        statusCode,
      };
      return boom;
    };

    // unexpected error
    Errors.unexpected = () => {
      const payload = {
        error: "unexpected",
        statusCode: 500,
        detail: Errors.messages.unexpected,
      };
      return Errors.internal(payload);
    };

    // validation error
    Errors.badRequest = ({
      id,
      detail = "Validation Error",
      meta,
      key,
    }) => {
      const boom = Boom.badRequest(detail);
      boom.output.payload = {
        error: "badRequest",
        id,
        detail,
        key,
        meta,
      };
      return boom;
    };

    Errors.unauthorized = ({
      id,
      detail = "Unauthorized",
      meta,
      key,
    } = {}) => {
      const boom = Boom.unauthorized(detail);
      boom.output.payload = {
        error: "unauthorized",
        id,
        detail,
        key,
        meta,
      };
      return boom;
    };

    plugin.ext('onPreResponse', async (request, h) => {
      // path is with query string and pathname is not
      const {
        response,
      } = request;

      if (response && response.isBoom) {
        if (response.name === "ValidationError") {
          const meta = {};
          const detail = [];
          response.details.forEach((e) => {
            meta[e.context.key] = e.message;
            detail.push(e.message);
          });
          return Errors.badRequest({
            meta,
            detail: detail.join(", "),
          });
        }
        if (
          (response.data && response.data.code === "EISDIR")
          || (response.message === "Not Found")
        ) {
          return h.continue;
        }
        return response;
      }
      return h.continue;
    });

    plugin.expose("internal", Errors.internal);
    plugin.expose("badRequest", Errors.badRequest);
    plugin.expose("unexpected", Errors.unexpected);
    plugin.expose("unauthorized", Errors.unauthorized);
  },
};
