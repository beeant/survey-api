import Joi from "joi";

export default () => {
  const models = {};

  models.withId = {
    id: Joi.number().optional(),
  };

  models.withDates = {
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
    deletedAt: Joi.date().allow(null),
  };

  models.withPagination = {
    page: Joi.number().optional(),
    limit: Joi.number().optional(),
  };

  return models;
};
