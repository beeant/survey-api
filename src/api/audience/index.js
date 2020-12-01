import Joi from "joi";

import PostAudience from "./PostAudience";
import GetListAudience from "./GetListAudience";
import PostInvite from "./PostInvite";

export default (server, {
  responses,
  requests,
  commons,
}) => ([{
  method: "POST",
  path: "/audiences",
  handler: PostAudience,
  options: {
    tags: ['api'],
    validate: {
      payload: requests.Audience,
    },
    response: {
      schema: responses.Success,
    },
  },
}, {
  method: "GET",
  path: "/audiences",
  handler: GetListAudience,
  options: {
    auth: {strategies: ["jwt"]},
    tags: ["api"],
    response: {
      schema: Joi.object({
        rows: responses.Audiences,
        count: Joi.number().required(),
        page: Joi.number().required(),
        limit: Joi.number().required(),
      }),
    },
    validate: {
      query: Joi.object({
        ...commons.withPagination,
      }),
    },
  },
}, {
  method: "POST",
  path: "/audiences/invite",
  handler: PostInvite,
  options: {
    tags: ['api'],
    validate: {
      payload: Joi.object({
        emails: Joi.array().items(Joi.string()).required(),
        questionId: Joi.number().required(),
      }),
    },
    response: {
      schema: responses.Success,
    },
  },
}]);
