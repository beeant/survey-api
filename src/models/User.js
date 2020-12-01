import bcrypt from "bcrypt";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(126),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(126),
      allowNull: true,
      set(pw) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(pw, salt);
        this.setDataValue('password', hash);
      },
    },
  }, {
    paranoid: true,
    underscored: true,
    tableName: 'users',
  });

  if (!User) { return User; }

  User.verifyPassword = (hashed, password) => bcrypt.compare(password, hashed);

  return User;
};
