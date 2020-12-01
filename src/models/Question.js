module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    title: {
      type: DataTypes.STRING(126),
      allowNull: false,
    },
  }, {
    paranoid: true,
    underscored: true,
    tableName: 'questions',
  });

  if (!Question) { return Question; }

  Question.associate = (models) => {
    Question.Option = Question.hasMany(models.Option);
  };

  Question.getSurveyIncludes = (models) => ([{
    model: models.Option,
    include: [{
      model: models.Answer,
      include: [{
        model: models.Audience,
      }],
    }],
  }]);

  return Question;
};
