import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const complexityOptions = {
  min: 5,
  max: 1024,
  lowerCase: 0,
  upperCase: 0,
  numeric: 0,
  symbol: 0,
  requirementCount: 4,
};

export default (jois, {
  withId,
  withDates,
}) => {
  const requests = {};

  requests.Signup = Joi.object({
    email: Joi.string().min(1).required(),
    password: passwordComplexity(complexityOptions),
    password_confirmation: Joi.ref("password"),
  });

  requests.Signin = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  // answer
  requests.Answer = Joi.object(
  ).keys({
    ...withId,
    ...withDates,
  });

  requests.Answers = Joi.array().items(
    requests.Answer,
  );

  // option
  requests.Option = Joi.object(
    jois.Option.joi(),
  ).keys({
    ...withId,
    ...withDates,
    Answers: requests.Answers,
  });

  requests.Options = Joi.array().items(
    requests.Option,
  );

  // question
  requests.Question = Joi.object(
    jois.Question.joi(),
  ).keys({
    ...withId,
    ...withDates,
    Options: requests.Options.required(),
  });

  requests.Questions = Joi.array().items(
    requests.Question,
  );

  return requests;
};
