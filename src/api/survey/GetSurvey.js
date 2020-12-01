export default async ({
  params: {
    id,
  },
  server: {
    plugins: {
      db,
      errors,
    },
  },
}) => {
  try {
    const surveyInstance = await db.models.Question.findByPk(id, {
      include: db.models.Question.getSurveyIncludes(db.models),
    });

    if (!surveyInstance) {
      throw errors.badRequest({key: "survey_not_exist"});
    }

    return surveyInstance.toJSON();
  } catch (error) {
    console.log(error);
    if (error.isBoom) {
      return error;
    }
    return errors.unexpected(error);
  }
};
