const Curso = (sequelize, DataTypes) => {
  const Curso = sequelize.define("Curso", {
      nome: {
        type: DataTypes.STRING,
      },
      ch: {
        type: DataTypes.INTEGER,
      }
    },
    {
      tableName: "curso",
    }
  );
  return Curso;
};


export default Curso;
