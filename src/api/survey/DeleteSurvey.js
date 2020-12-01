export default async ({
  params: {
    id: questionId,
  },
  server: {
    plugins: {
      db,
      errors,
    },
  },
}) => {
  try {
    await db.models.Question.destroy({
      where: {
        id: questionId,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    if (error.isBoom) {
      return error;
    }
    return errors.unexpected(error);
  }
};
