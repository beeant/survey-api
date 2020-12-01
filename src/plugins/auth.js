const {
  JWT_SECRET,
  JWT_KEY,
} = process.env;

exports.plugin = {
  name: "auth",
  register: async (plugin) => {
    await plugin.register(require('hapi-auth-jwt2'));
    plugin.auth.strategy('jwt', 'jwt', {
      key: JWT_SECRET,
      cookieKey: JWT_KEY,
      validate: async (decoded, request) => {
        const {
          plugins: {
            db,
          },
        } = plugin;

        const session = await request.server.plugins.redis.get(`sessions:${decoded.id}`);
        const isValid = session && decoded && session.id === decoded.id;
        if (isValid) {
          const userInstance = await db.models.User.findOne({
            where: {
              id: session.id,
            },
          });

          if (userInstance) {
            return {
              isValid: true,
              credentials: {
                ...decoded,
                user: session.id,
                loggedInUser: userInstance.toJSON(),
              },
            };
          }
        }
        return {
          isValid: false,
        };
      },
      verifyOptions: {
        algorithms: ['HS256'],
      },
    });
  },
};

