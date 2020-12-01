export default async ({
  auth: {
    credentials: {
      id,
    },
  },
  server: {
    plugins: {
      db,
      errors,
    },
  },
}) => {
  const userInstance = await db.models.User.findByPk(id);

  if (!userInstance) {
    throw errors.unauthorized();
  }

  const {
    password: omitPassword,
    ...user
  } = userInstance.toJSON();

  return user;
};
