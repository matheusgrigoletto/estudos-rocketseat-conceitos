// imports
const express = require("express");

// inicializa o express
const app = express();

/**
 * Métodos HTTP:
 *
 * GET: buscar informações (recursos) do back-end
 * POST: criar uma informação no back-end
 * PUT/PATCH: alterar uma informação no back-end
 * DELETE: excluir uma informação no back-end
 */

// HTTP GET
app.get("/projects", (request, response) => {
  // retornando um json
  return response.json({
    data: ["Projeto Ambar", "Projeto Blackbird", "Projeto Codecanyon"],
  });
});

// HTTP POST
app.post("/projects", (request, response) => {
  // lógica para tratar e salvar dados enviados ...

  // retornar alguma informação
  return response.json({
    data: [
      "Projeto Ambar",
      "Projeto Blackbird",
      "Projeto Codecanyon",
      "Projeto Destinybond",
    ],
  });
});

// HTTP PUT
app.put("/projects/:id", (request, response) => {
  // lógica para tratar e salvar (atualizar) os dados enviados ...

  return response.json({
    data: [
      "Projeto Ambar",
      "Projeto Blackbird",
      "Projeto CleanCyan",
      "Projeto Destinybond",
    ],
  });
});

// HTTP DELETE
app.delete("/projects/:id", (request, response) => {
  // lógica para tratar excluir os dados enviados ...

  return response.json({
    data: ["Projeto Ambar", "Projeto Blackbird", "Projeto CleanCyan"],
  });
});

// servidor executando na porta 3333
app.listen(3333, () => console.log("🚀 Server started!"));
