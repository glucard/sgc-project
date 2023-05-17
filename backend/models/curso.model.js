const curso = (sequelize, DataTypes) => {
  const Curso = sequelize.define(
    "Curso",
    {
      nome: {
        type: DataTypes.STRING,
      },
      ch: {
        type: DataTypes.INTEGER,
      },
      categoria: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "curso",
    }
  );
  return Curso;
};

export default curso;
