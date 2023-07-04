const user = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.INTEGER,
      },
      number: {
        type: DataTypes.STRING,
      },
      imagem_perfil: {
        type: DataTypes.STRING,
      },
      endereco: {
        type: DataTypes.STRING,
      }
    },
    {
      tableName: "user",
    }
  );
  return User;
};

export default user;
