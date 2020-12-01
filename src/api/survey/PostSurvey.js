import Bluebird from "bluebird";

export default async ({
  payload: {
    Options,
    ...question
  },
  server: {
    plugins: {
      db,
      errors,
    },
  },
}) => {
  const transaction = await db.sequelize.transaction();

  try {
    const questionInstance = await db.models.Question.create(
      question,
      {transaction},
    );

    if (Options) {
      const newOptions = await Bluebird.mapSeries(Options, async (Option) => {
        const newOption = await db.models.Option.create(
          Option,
          {transaction},
        );
        return newOption;
      });

      await questionInstance.setOptions(
        newOptions,
        {transaction},
      );
    }

    await questionInstance.reload({
      include: db.models.Question.getSurveyIncludes(db.models),
      transaction,
    });

    await transaction.commit();
    return questionInstance.toJSON();
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    if (error.isBoom) {
      return error;
    }
    return errors.unexpected(error);
  }
};
