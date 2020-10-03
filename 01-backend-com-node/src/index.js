// imports
const express = require("express");

// inicializa o express
const app = express();

// rota raiz com HTTP GET
app.get("/", (request, response) => {
  // retornando um json
  return response.json({
    message: "Hello world!",
  });
});

// servidor executando na porta 3333
app.listen(3333, () => console.log("🚀 Server started!"));
