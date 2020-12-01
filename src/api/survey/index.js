import Joi from "joi";

import PostSurvey from "./PostSurvey";
import PutSurvey from "./PutSurvey";
import GetSurvey from "./GetSurvey";
import DeleteSurvey from "./DeleteSurvey";
import GetListSurvey from "./GetListSurvey";

export default (server, {
  responses,
  requests,
  commons,
}) => [{
  method: "POST",
  path: "/surveys",
  handler: PostSurvey,
  options: {
    auth: {strategies: ["jwt"]},
    tags: ["api"],
    response: {
      schema: responses.Question,
    },
    validate: {
      payload: requests.Question,
    },
  },
}, {
  method: "PUT",
  path: "/surveys/{id}",
  handler: PutSurvey,
  options: {
    auth: {strategies: ["jwt"]},
    tags: ["api"],
    response: {
      schema: responses.Question,
    },
    validate: {
      params: Joi.object(commons.withId),
      payload: requests.Question,
    },
  },
}, {
  method: "GET",
  path: "/surveys/{id}",
  handler: GetSurvey,
  options: {
    tags: ["api"],
    response: {
      schema: responses.Question,
    },
    validate: {
      params: Joi.object({
        ...commons.withId,
      }),
    },
  },
}, {
  method: "GET",
  path: "/surveys",
  handler: GetListSurvey,
  options: {
    tags: ["api"],
    response: {
      schema: Joi.object({
        rows: responses.Questions,
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
  method: "DELETE",
  path: "/surveys/{id}",
  handler: DeleteSurvey,
  options: {
    auth: {strategies: ["jwt"]},
    tags: ["api"],
    response: {
      schema: responses.Success,
    },
    validate: {
      params: Joi.object({
        ...commons.withId,
      }),
    },
  },
}];
