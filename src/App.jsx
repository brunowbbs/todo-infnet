import { useState } from "react";
import Card from "./components/card";
import "./styles.css";

export default function App() {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");

  const [tarefas, setTarefas] = useState([]);

  function salvarTarefa(event) {
    event.preventDefault();

    const novaTarefa = {
      titulo: titulo,
      categoria: categoria,
      data: data,
      descricao: descricao,
    };

    setTarefas([...tarefas, novaTarefa]);

    setTitulo("");
    setCategoria("");
    setData("");
    setDescricao("");
  }

  return (
    <div className="container_app">
      <div className="container_form">
        <form onSubmit={(event) => salvarTarefa(event)}>
          <h2>Nova tarefa</h2>

          <input
            placeholder="Título"
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
          />

          <select
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
          >
            <option value="">Selecione...</option>
            <option value="Pagamentos">Pagamentos</option>
            <option value="Recebimento">Recebimentos</option>
          </select>

          <input
            placeholder="Data"
            type="date"
            value={data}
            onChange={(event) => setData(event.target.value)}
          />

          <input
            placeholder="Descrição"
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
          />

          <button>Salvar</button>
        </form>
      </div>

      <div style={{ flex: 1, padding: 10 }}>
        <h1 style={{ fontSize: "1rem" }}>Minhas Tarefas</h1>

        {tarefas.map((tarefa) => (
          <Card tarefa={tarefa} />
        ))}
      </div>
    </div>
  );
}
