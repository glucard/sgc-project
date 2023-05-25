const Categoria = (sequelize, DataTypes) => {
    const Categoria = sequelize.define(
      "Categoria",
      {
        nome: {
          type: DataTypes.STRING,
        },
        descricao: {
          type: DataTypes.STRING,
        },
      },
      {
        tableName: "categoria",
      }
    );
    return Categoria;
  };
  
export default Categoria;