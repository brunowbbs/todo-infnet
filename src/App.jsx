import { useState, useEffect } from "react";
import Card from "./components/card";
import "./styles.css";

//local storage

// PROPS, STATES, SIDE EFFECTS

export default function App() {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");

  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    getTarefasLocalStorage();
  }, []);

  function getTarefasLocalStorage() {
    const tarefasLocalStorageString = localStorage.getItem("@tarefas");

    if (tarefasLocalStorageString) {
      const tarefasRecuperadas = JSON.parse(tarefasLocalStorageString);
      setTarefas([...tarefasRecuperadas]);
    }
  }

  function salvarTarefa(event) {
    event.preventDefault();

    const novaTarefa = {
      titulo: titulo,
      categoria: categoria,
      data: data,
      descricao: descricao,
    };

    setTarefas([...tarefas, novaTarefa]);

    const tarefasString = JSON.stringify([...tarefas, novaTarefa]);

    localStorage.setItem("@tarefas", tarefasString);

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
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h1 style={{ fontSize: "1rem" }}>Minhas Tarefas</h1>
          <span>
            Total: {tarefas.length}{" "}
            {tarefas?.length === 1 ? "tarefa" : "tarefas"}
          </span>
        </div>

        {tarefas.length === 0 ? <p>Nenhuma tarefa cadastrada</p> : null}

        {tarefas.map((tarefa, index) => (
          <Card
            key={index}
            tarefa={tarefa}
            index={index}
            tarefas={tarefas}
            setTarefas={setTarefas}
          />
        ))}
      </div>
    </div>
  );
}
