import PostAudience from "./PostAudience";

export default (server, {
  responses,
  requests,
}) => ([{
  method: "POST",
  path: "/audience",
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
}]);
