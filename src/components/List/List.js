import React, { useState, useEffect, useRef } from "react";
import Note from "../Note/Note";
import "./List.scss";
import { useDispatch, useSelector } from "react-redux";
import { addNewNote } from "../../store/mainReducer";
import { idNotesIncre } from "../../store/idCaunterReducer";

export default function List(props) {
  // hooks
  const inpNewNote = useRef(null);
  const [render, setRender] = useState(0);

  // Redux
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.main.lists);
  const idNotes = useSelector((state) => state.id.id_notes);

  // получаем конкретные notes
  let notes = null;
  lists.forEach((e) => {
    if (e.id == props.id) {
      notes = e.notes;
    }
  });

  function addNote() {
    const a = [
      props.id,
      { content: inpNewNote.current.value, id_notes: idNotes },
    ];
    dispatch(idNotesIncre()); // увеличиваем id на 1
    dispatch(addNewNote(a)); // передаём запись и id в store
    setRender(render + 1);
  }
  return (
    <div className="List">
      {console.log("render list")}

      <div className="List__header">
        <div className="List__inpu-wrapp">
          <input ref={inpNewNote} type="text" placeholder="Add new notes" />
          <div className="List__btn" onClick={addNote}>
            +
          </div>
        </div>
        <h2>{props.name}</h2>
        <div></div>
      </div>
      <div className="List__main">
        {notes.length === 0
          ? ""
          : notes.map((e) => {
              return (
                <Note
                  id_list={props.id}
                  id_note={e.id_notes}
                  key={e.id_notes}
                />
              );
            })}
      </div>
    </div>
  );
}
