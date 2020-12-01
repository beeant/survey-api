import PostSignup from "./PostSignup";
import PostSignin from "./PostSignin";
import GetMe from "./GetMe";
import PostLogout from "./PostLogout";

export default (server, {
  responses,
  requests,
}) => ([{
  method: "POST",
  path: "/auth/signup",
  handler: PostSignup,
  options: {
    tags: ['api'],
    validate: {
      payload: requests.Signup,
    },
    response: {
      schema: responses.Success,
    },
  },
}, {
  method: "POST",
  path: "/auth/signin",
  handler: PostSignin,
  options: {
    tags: ['api'],
    validate: {
      payload: requests.Signin,
    },
    response: {
      schema: responses.User,
    },
  },
}, {
  method: "POST",
  path: "/auth/logout",
  handler: PostLogout,
  options: {
    auth: {strategies: ["jwt"]},
    tags: ['api'],
    response: {
      schema: responses.Success,
    },
  },
}, {
  method: "GET",
  path: "/auth/me",
  handler: GetMe,
  options: {
    auth: {strategies: ["jwt"]},
    tags: ["api"],
    response: responses.User,
  },
}]);
