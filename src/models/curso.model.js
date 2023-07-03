const Curso = (sequelize, DataTypes) => {
  const Curso = sequelize.define("Curso", {
      nome: {
        type: DataTypes.STRING,
      },
      ch: {
        type: DataTypes.INTEGER,
      },
      imagem: {
        type: DataTypes.STRING,
      },
      descricao: {
        type: DataTypes.STRING,
      }
    },
    {
      tableName: "curso",
    }
  );
  return Curso;
};


export default Curso;
