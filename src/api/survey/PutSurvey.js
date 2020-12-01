import Bluebird from "bluebird";

export default async ({
  params: {
    id: questionId,
  },
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
    const questionInstance = await db.models.Question.findByPk(questionId, {transaction});
    if (!questionInstance) {
      throw errors.badRequest({key: "error_question_not_found"});
    }

    await questionInstance.set(question, {
      transaction,
      where: {
        questionId,
      },
    });
    await questionInstance.save({transaction});

    if (Options) {
      const newOptions = await Bluebird.map(Options, async (Option) => {
        if (Option.id) {
          await db.models.Option.update(Option, {
            transaction,
            where: {
              id: Option.id,
            },
          });
          const updatedOption = await db.models.Option.findByPk(Option.id, {transaction});
          return updatedOption;
        }
        const newOption = await db.models.Option.create(Option, {transaction});
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
