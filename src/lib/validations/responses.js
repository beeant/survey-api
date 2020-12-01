import Joi from "joi";

export default (jois, {
  withId,
  withDates,
}) => {
  const responses = {};

  responses.Success = Joi.object({
    success: Joi.boolean(),
  });

  // user
  responses.User = Joi.object({
    email: Joi.string().required(),
  }).keys({
    ...withId,
    ...withDates,
  });

  // audience
  responses.Audience = Joi.object(
    jois.Audience.joi(),
  ).keys({
    ...withId,
    ...withDates,
  });

  responses.Audiences = Joi.array().items(
    responses.Audience,
  );

  // answer
  responses.Answer = Joi.object(
  ).keys({
    ...withId,
    ...withDates,
    OptionId: Joi.number().required(),
    AudienceId: Joi.number().required(),
    Audience: responses.Audience,
  });

  responses.Answers = Joi.array().items(
    responses.Answer,
  );

  // option
  responses.Option = Joi.object(
    jois.Option.joi(),
  ).keys({
    ...withId,
    ...withDates,
    QuestionId: Joi.number().required(),
    Answers: responses.Answers,
  });

  responses.Options = Joi.array().items(
    responses.Option,
  );

  // question
  responses.Question = Joi.object(
    jois.Question.joi(),
  ).keys({
    ...withId,
    ...withDates,
    Options: responses.Options,
  });

  responses.Questions = Joi.array().items(
    responses.Question,
  );

  return responses;
};
