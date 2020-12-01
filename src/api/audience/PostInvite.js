import mail from "../../mails";

export default async ({
  payload: {
    emails,
    questionId,
  },
  server: {
    plugins: {
      db,
      errors,
    },
  },
}) => {
  if (!emails || !emails.length) {
    throw errors.badRequest({key: "enter_email_addresses"});
  }
  try {
    const surveyInstance = await db.models.Question.findByPk(questionId);
    if (!surveyInstance) {
      throw errors.badRequest({key: "survey_not_exist"});
    }

    const result = await mail("invite", {
      to: emails,
      data: {
        survey: surveyInstance.toJSON(),
      },
    });

    if (!result) {
      throw errors.badRequest({key: "sendgrid_error_or_api_key_invalid"});
    }

    return {success: true};

  } catch (error) {
    console.log(error);
    if (error.isBoom) {
      return error;
    }
    return errors.unexpected(error);
  }
};
