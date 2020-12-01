module.exports = (sequelize, DataTypes) => {
  const Audience = sequelize.define('Audience', {
    name: {
      type: DataTypes.STRING(126),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(126),
      allowNull: false,
    },
  }, {
    paranoid: true,
    underscored: true,
    tableName: 'audiences',
  });

  if (!Audience) { return Audience; }

  Audience.associate = (models) => {
    Audience.Answer = Audience.hasOne(models.Answer);
  };

  return Audience;
};
