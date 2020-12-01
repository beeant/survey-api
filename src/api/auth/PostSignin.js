import JWT from "jsonwebtoken";

const {
  JWT_SECRET,
} = process.env;

export default async (r, h) => {
  const {
    payload: {
      password,
      email,
    },
    server: {
      plugins: {
        db,
        errors,
        redis,
      },
    },
  } = r;

  const userInstance = await db.models.User.findOne({
    where: {
      email,
    },
  });

  if (
    !userInstance
    || !userInstance.password
    || !await db.models.User.verifyPassword(userInstance.password, password)
  ) {
    throw errors.badRequest({key: "error_login"});
  }

  const {
    password: omitPassword,
    ...user
  } = userInstance.toJSON();

  const token = JWT.sign({id: user.id}, JWT_SECRET);
  redis.set(`sessions:${user.id}`, user);

  return h
    .response(user)
    .header("Authorization", token);
};
