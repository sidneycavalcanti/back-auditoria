const config = {
    dialect: "mysql",
    host: "localhost",
    // port: 3307,
    username: "root",
    password: "",
    database: "escala",
    define: {
      timestamp: true, // cria duas colunas: createdAt e updatedAt
      underscored: true,
      underscoredAll: true,
    },
  };

  export default config;