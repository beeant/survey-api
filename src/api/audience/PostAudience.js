export default async ({
  payload: {
    name,
    email,
    OptionId,
  },
  server: {
    plugins: {
      db,
      errors,
    },
  },
}) => {
  let audienceInstance = await db.models.Audience.findOne({
    where: {
      email,
    },
  });

  if (!audienceInstance) {
    audienceInstance = await db.models.Audience.create({
      name,
      email,
    });
  } else {
    await audienceInstance.set({
      name,
      email,
    });
  }

  const optionInstance = await db.models.Option.findByPk(OptionId);
  if (!optionInstance) {
    throw errors.badRequest({key: "option_not_found"});
  }

  // check if question is already answered by audience with the same email
  const answeredQuestionInstance = await db.models.Question.findOne({
    where: {
      id: optionInstance.QuestionId,
    },
    include: [{
      model: db.models.Option,
      required: true,
      include: [{
        model: db.models.Answer,
        required: true,
        include: [{
          required: true,
          model: db.models.Audience,
          where: {
            email,
          },
        }],
      }],
    }],
  });

  if (answeredQuestionInstance) {
    throw errors.badRequest({key: "already_answered"});
  }

  await db.models.Answer.create({
    OptionId,
    AudienceId: audienceInstance.id,
  });
  return {success: true};
};
