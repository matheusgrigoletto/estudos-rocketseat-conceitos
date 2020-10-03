// imports
const express = require("express");

// => Atenção: as intruções devem ser definidas/executadas na ordem certa,
//    de cima pra baixo

// inicializa o express
const app = express();

// use() => middlewares
// configurando para receber json no body
app.use(express.json());

/**
 * Métodos HTTP:
 *
 * GET: buscar informações (recursos) do back-end
 * POST: criar uma informação no back-end
 * PUT/PATCH: alterar uma informação no back-end
 * DELETE: excluir uma informação no back-end
 */

/**
 * Tipos de parâmetros:
 *
 * Query params: mais usado em filtros e paginação
 * Route params: identificar recursos na hora de atualizar ou excluir
 * Request body: conteúdo na hora de criar ou editar um recurso, normalmente
 *    vindo via JSON
 */

// HTTP GET
app.get("/projects", (request, response) => {
  const { title, owner } = request.query;

  // retornando um json
  return response.json({
    data: ["Projeto Ambar", "Projeto Blackbird", "Projeto Codecanyon"],
    title,
    owner,
  });
});

// HTTP POST
app.post("/projects", (request, response) => {
  const { title, owner } = request.body;

  // => lógica para tratar e salvar dados enviados ...

  // retornar alguma informação
  return response.json({
    data: [
      "Projeto Ambar",
      "Projeto Blackbird",
      "Projeto Codecanyon",
      "Projeto Destinybond",
    ],
    title,
    owner,
  });
});

// HTTP PUT
app.put("/projects/:id", (request, response) => {
  const { id } = request.params;

  // => lógica para tratar e salvar (atualizar) os dados enviados ...

  return response.json({
    data: [
      "Projeto Ambar",
      "Projeto Blackbird",
      "Projeto CleanCyan",
      "Projeto Destinybond",
    ],
    id,
  });
});

// HTTP DELETE
app.delete("/projects/:id", (request, response) => {
  const { id } = request.params;

  // => lógica para tratar excluir os dados enviados ...

  return response.json({
    data: ["Projeto Ambar", "Projeto Blackbird", "Projeto CleanCyan"],
  });
});

// servidor executando na porta 3333
app.listen(3333, () => console.log("🚀 Server started!"));
