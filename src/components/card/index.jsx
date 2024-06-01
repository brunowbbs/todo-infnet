import { useState } from "react";
import "./styles.css";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Card(props) {
  const {
    tarefa,
    index,
    tarefas,
    setTarefas,
    preencheForm,
    setIsOpen,
    setIndexParaRemover,
  } = props;

  const [isEditing, setIsEditing] = useState(false);

  function formatarData(data) {
    const newData = new Date(data);

    const dataFormatada = new Intl.DateTimeFormat("pt-br").format(newData);
    return dataFormatada;
  }

  const [titulo, setTitulo] = useState(tarefa.titulo);

  function editarTarefa() {
    const temp = [...tarefas];
    temp[index].titulo = titulo;

    const tarefasString = JSON.stringify([...temp]);

    localStorage.setItem("@tarefas", tarefasString);

    setTarefas(temp);
  }

  return (
    <div className="card_button">
      <div className="left">
        {isEditing ? (
          <input
            onBlur={() => {
              setIsEditing(false);
              editarTarefa();
            }}
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
          />
        ) : (
          <p onClick={() => setIsEditing(true)}>{tarefa.titulo}</p>
        )}

        <p>
          {tarefa?.categoria ? tarefa.categoria : "Categoria nao informada"}
        </p>

        <p>{tarefa.descricao}</p>
      </div>

      <div className="right">
        <p className="date"> {formatarData(tarefa.data)}</p>
        <div>
          <button className="btn_icon" onClick={preencheForm}>
            <FaEdit color="#0FBA3F" size={20} />
          </button>
          <button
            className="btn_icon"
            onClick={() => {
              setIsOpen(true);
              setIndexParaRemover(index);
            }}
          >
            <MdDelete color="#F90000" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
