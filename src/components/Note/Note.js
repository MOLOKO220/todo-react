import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Note.scss";
import remuveImg from "./img/remuv.png";
import editImg from "./img/edit.png";
import { chengNote } from "../../store/mainReducer";
import { removeNote } from "../../store/mainReducer";

function Note(props) {
  // hooks
  const editInp = useRef(null); // получаем input
  const [render, setRender] = useState(0); // рендер

  // redux
  const lists = useSelector((state) => state.main.lists);
  const dispatch = useDispatch();

  // получить конкретную запись
  let thisNote = null;
  lists.forEach((e) => {
    if (e.id == props.id_list) {
      e.notes.forEach((i) => {
        if (i.id_notes == props.id_note) {
          thisNote = i;
        }
      });
    }
  });

  // показать input
  function showEditInp() {
    editInp.current.style = "display: block";
  }

  // редактировать текст
  function editNote(e) {
    if (e.keyCode === 13 && editInp.current.value != "") {
      editInp.current.style = "display: none";

      const changNote = [
        props.id_list,
        thisNote.id_notes,
        editInp.current.value,
      ];

      dispatch(chengNote(changNote));
      editInp.current.value = "";

      setRender(render + 1);
    }
  }

  function remuveThis() {
    const removeItem = [props.id_list, thisNote.id_notes];
    dispatch(removeNote(removeItem));
  }

  return (
    <div className="Note">
      <p className="Note__content">{thisNote.content}</p>
      <input
        type="text"
        ref={editInp}
        placeholder={thisNote.content}
        onKeyDown={editNote}
      />

      <div className="Note__btn-wrapp">
        <div className="Note__edit-btn" onClick={showEditInp}>
          <img src={editImg} alt="edit" />
        </div>
        <div className="Note__remov-btn" onClick={remuveThis}>
          <img src={remuveImg} alt="remove" />
        </div>
      </div>
    </div>
  );
}

export default Note;
