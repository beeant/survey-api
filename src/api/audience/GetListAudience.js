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
    const count = await db.models.Audience.count();
    const audienceInstances = await db.models.Audience.findAll({
      limit,
      offset,
    });

    return {
      rows: audienceInstances.map((surveyInstance) => surveyInstance.toJSON()),
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
