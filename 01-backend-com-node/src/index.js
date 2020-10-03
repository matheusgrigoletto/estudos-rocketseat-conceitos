// imports
const express = require("express");
const { uuid } = require("uuidv4");

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

// variável de memória, criada toda vez que inicia o app #NSFP (Non Safe For Production)
const projects = [];

// HTTP GET
app.get("/projects", (request, response) => {
  const { title } = request.query;

  // caso fizer um filtro
  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  // retornando um json
  return response.json(results);
});

// HTTP POST
app.post("/projects", (request, response) => {
  const { title, owner } = request.body;

  const project = {
    id: uuid(),
    title,
    owner,
  };

  projects.push(project);

  // retornar objeto criado
  return response.json(project);
});

// HTTP PUT
app.put("/projects/:id", (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  // buscar a posição do projeto no array
  const projectIndex = projects.findIndex((project) => project.id === id);

  // não encontrado
  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found" });
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

// HTTP DELETE
app.delete("/projects/:id", (request, response) => {
  const { id } = request.params;

  // buscar a posição do projeto no array
  const projectIndex = projects.findIndex((project) => project.id === id);

  // não encontrado
  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found" });
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

// servidor executando na porta 3333
app.listen(3333, () => console.log("🚀 Server started!"));
