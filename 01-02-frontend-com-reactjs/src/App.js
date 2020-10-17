import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import api from "./services/api";
import "./App.css";

/**
 * Componente
 * Propriedade
 * Estado & Imutabilidade
 */

function App() {
  // useState retorna um array com 2 posições
  // 1- variável com seu valor inicial
  // 2- função para atualizarmos esse valor
  const [projects, setProjects] = useState([]);

  // Disparar uma função quando uma variável for alterada ou quando o componente for exibido em tela
  // No caso abaixo, o segundo caso
  useEffect(() => {
    api.get("/projects").then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleCreateProject() {
    const response = await api.post("/projects", {
      title: `Novo projeto - ${new Date().toISOString()}`,
      owner: "Matheus B. Grigoletto",
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Projects" />

      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>

      <button type="button" onClick={handleCreateProject}>
        Adicionar projeto
      </button>
    </>
  );
}

export default App;
