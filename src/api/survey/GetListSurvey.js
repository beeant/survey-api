export default async ({
  server: {
    plugins: {
      db,
      errors,
    },
  },
  query: {
    limit = 20,
    page = 1,
  },
}) => {
  const offset = (page - 1) * limit;

  try {
    const count = await db.models.Question.count();
    const surveyInstances = await db.models.Question.findAll({
      limit,
      offset,
      include: db.models.Question.getSurveyIncludes(db.models),
      order: [
        ["id", "DESC"],
      ],
    });

    return {
      rows: surveyInstances.map((surveyInstance) => surveyInstance.toJSON()),
      count,
      limit,
      page,
    };
  } catch (error) {
    console.log(error);
    if (error.isBoom) {
      return error;
    }
    return errors.unexpected(error);
  }
};
