export default async ({
  payload: {
    password,
    email,
  },
  server: {
    plugins: {
      db,
      errors,
    },
  },
}) => {
  const userInstance = await db.models.User.findOne({
    where: {
      email,
    },
  });

  if (userInstance) {
    throw errors.badRequest({
      key: "user_already_exist",
    });
  }

  await db.models.User.create({
    email,
    password,
  });

  return {
    success: true,
  };
};
