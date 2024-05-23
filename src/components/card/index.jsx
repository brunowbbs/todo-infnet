import "./styles.css";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Card(props) {
  const { tarefa } = props;

  // tarefa.titulo
  // tarefa.categoria
  // tarefa.data
  // tarefa.descricao

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
        <p className="date"> {tarefa.data}</p>
        <div>
          <button className="btn_icon" onClick={() => alert("Editar")}>
            <FaEdit color="#0FBA3F" size={20} />
          </button>
          <button className="btn_icon" onClick={() => alert("Apagar")}>
            <MdDelete color="#F90000" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
