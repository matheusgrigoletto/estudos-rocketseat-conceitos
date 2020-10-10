// imports
const express = require("express");
const cors = require("cors");
const { v4, validate } = require("uuid");

// => Atenção: as intruções devem ser definidas/executadas na ordem certa,
//    de cima pra baixo

// inicializa o express
const app = express();

// use() => middlewares
// configurando para receber json no body
app.use(express.json());
app.use(cors());

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

/**
 * Middleware:
 *
 * Interceptador de requisições que pode interromper totalmente a requisição ou alterar dados da requisição.
 * Geralmente usado que um trecho de código seja disparado após uma requisição e antes de enviar uma resposta.
 */

function logRequest(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);

  next(); // Chama próximo middleware

  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!validate(id)) {
    return response.status(400).json({ error: "Invalid Project ID." });
  }

  return next();
}

// Aplicar para todas as rotas/requisições
app.use(logRequest);

// Aplicar apenas nas rotas específicas
app.use("/projects/:id", validateProjectId);

// variável de memória, criada toda vez que inicia o app #NSFP (Non Safe For Production)
const projects = [];

// HTTP GET
app.get(
  "/projects",
  /*logRequest,*/ (request, response) => {
    // usar logRequest (middleware) apenas nas rotas específicas
    const { title } = request.query;

    // caso fizer um filtro
    const results = title
      ? projects.filter((project) => project.title.includes(title))
      : projects;

    // retornando um json
    return response.json(results);
  }
);

// HTTP POST
app.post("/projects", (request, response) => {
  const { title, owner } = request.body;

  const project = {
    id: v4(),
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
