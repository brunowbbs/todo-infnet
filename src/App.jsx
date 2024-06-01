import { useState, useEffect } from "react";
import Card from "./components/card";

import Modal from "react-modal";

import "./styles.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export default function App() {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");

  const [indexSelecionado, setIndexSelecionado] = useState(null);

  const [indexParaRemover, setIndexParaRemover] = useState(null);

  const [tarefas, setTarefas] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);

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

  function editarTarefa(event) {
    event.preventDefault();

    // const novaTarefa = {
    //   titulo: titulo,
    //   categoria: categoria,
    //   data: data,
    //   descricao: descricao,
    // };

    const tempTarefas = [...tarefas];

    tempTarefas[indexSelecionado].titulo = titulo;
    tempTarefas[indexSelecionado].categoria = categoria;
    tempTarefas[indexSelecionado].data = data;
    tempTarefas[indexSelecionado].descricao = descricao;

    setTarefas(tempTarefas);

    const tarefasString = JSON.stringify([...tempTarefas]);

    localStorage.setItem("@tarefas", tarefasString);

    setTitulo("");
    setCategoria("");
    setData("");
    setDescricao("");
    setIndexSelecionado(null);
  }

  function preencheForm(tarefa, index) {
    setTitulo(tarefa.titulo);
    setCategoria(tarefa.categoria);
    setData(tarefa.data);
    setDescricao(tarefa.descricao);
    setIndexSelecionado(index);
  }

  function removerTarefa() {
    const tarefasFiltradas = tarefas.filter(
      (tarefa, indexTarefa) => indexTarefa !== indexParaRemover
    );

    localStorage.setItem("@tarefas", JSON.stringify(tarefasFiltradas));

    setTarefas(tarefasFiltradas);

    setIsOpen(false);
  }

  //zero | null | undefined

  return (
    <div className="container_app">
      <div className="container_form">
        <form
          onSubmit={(event) => {
            if (indexSelecionado === null) {
              salvarTarefa(event);
            } else {
              editarTarefa(event);
            }
          }}
        >
          <h2>Nova tarefa - {String(indexSelecionado)}</h2>

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
            preencheForm={() => preencheForm(tarefa, index)}
            setIsOpen={setIsOpen}
            setIndexParaRemover={setIndexParaRemover}
          />
        ))}
      </div>

      <Modal isOpen={modalIsOpen} style={customStyles}>
        <h4>Confirmação</h4>
        <p>Deseja realmente apagar o registro?</p>

        <button onClick={removerTarefa}>SiM</button>
        <button onClick={() => setIsOpen(false)}>NÃO</button>
      </Modal>
    </div>
  );
}
