module.exports = (sequelize) => {
  const Answer = sequelize.define('Answer', {
  }, {
    paranoid: true,
    underscored: true,
    tableName: 'answers',
  });

  if (!Answer) { return Answer; }

  Answer.associate = (models) => {
    Answer.Option = Answer.belongsTo(models.Option);
    Answer.Audience = Answer.belongsTo(models.Audience);
  };

  return Answer;
};
