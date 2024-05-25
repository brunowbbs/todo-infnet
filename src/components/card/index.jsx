import "./styles.css";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Card(props) {
  const { tarefa, index, tarefas, setTarefas } = props;

  function removerTarefa() {
    const tarefasFiltradas = tarefas.filter(
      (tarefa, indexTarefa) => indexTarefa !== index
    );

    localStorage.setItem("@tarefas", JSON.stringify(tarefasFiltradas));

    setTarefas(tarefasFiltradas);
  }

  function formatarData(data) {
    const newData = new Date(data);

    const dataFormatada = new Intl.DateTimeFormat("pt-br").format(newData);
    return dataFormatada;
  }

  return (
    <div className="card_button">
      <div className="left">
        <p>{tarefa.titulo}</p>
        <p>
          {tarefa?.categoria ? tarefa.categoria : "Categoria nao informada"}
        </p>
        <p>{tarefa.descricao}</p>
      </div>

      <div className="right">
        <p className="date"> {formatarData(tarefa.data)}</p>
        <div>
          <button className="btn_icon" onClick={() => alert("Editar")}>
            <FaEdit color="#0FBA3F" size={20} />
          </button>
          <button className="btn_icon" onClick={removerTarefa}>
            <MdDelete color="#F90000" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
