import JWT from 'jsonwebtoken';

const {
  JWT_SECRET,
} = process.env;

export default async (r, h) => {
  const {
    auth: {
      token,
    },
    server: {
      plugins: {
        redis,
      },
    },
  } = r;

  const decoded = JWT.decode(token, JWT_SECRET);
  if (decoded && decoded.id) {
    redis.set(`sessions:${decoded.id}`, JSON.stringify({}));
  }
  return h.response({success: true}).header("Authorization", "");
};
