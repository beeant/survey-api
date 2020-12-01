module.exports = (sequelize, DataTypes) => {
  const Option = sequelize.define('Option', {
    title: {
      type: DataTypes.STRING(126),
      allowNull: false
    },
  }, {
    paranoid: true,
    underscored: true,
    tableName: 'options',
  });

  if (!Option) { return Option; }

  Option.associate = (models) => {
    Option.Question = Option.belongsTo(models.Question);
    Option.Answer = Option.hasMany(models.Answer);
  };

  return Option;
};
