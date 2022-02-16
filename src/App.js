import React, { useState, useEffect, useRef } from "react";
import "./App.scss";
import List from "./components/List/List";
import { useDispatch, useSelector } from "react-redux";
import { addNewItem } from "./store/mainReducer";
import { idListsIncre } from "./store/idCaunterReducer";
import { removeListReducer } from "./store/mainReducer";

function App() {
  // hooks
  const [mainList, setMainList] = useState(null);
  const newListInp = useRef(null); // для value из input

  // Redux
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.main.lists);
  const idLists = useSelector((state) => state.id.id_lists);

  // создаём новый list
  function addNewList() {
    const item = [{ id: idLists, name: newListInp.current.value, notes: [] }];
    dispatch(addNewItem(item)); // передаём данные в store
    dispatch(idListsIncre()); // повешаем значения id
  }

  // выводим конкретный список
  function showList(Event) {
    lists.forEach((e) => {
      if (Event.target.dataset.id == e.id) {
        setMainList(e);
      }
    });
  }

  // удаление списка
  function removeList(e) {
    e.stopPropagation();
    setMainList(null);
    dispatch(removeListReducer(e.target.dataset.id));
  }

  return (
    <div className="App">
      <div className="manu">
        <div className="manu__top">
          <input ref={newListInp} type="text" placeholder="Name new list" />
          <div className="manu__btn" onClick={addNewList}>
            +
          </div>
        </div>
        <div className="manu__main">
          {lists.map((e) => {
            return (
              <div
                className="manu__lists-btn"
                key={e.id}
                data-id={e.id}
                onClick={showList}
              >
                {e.name}
                <div className="close__btn" data-id={e.id} onClick={removeList}>
                  x
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="main-lists">
        {mainList === null ? (
          ""
        ) : (
          <List name={mainList.name} id={mainList.id} key={mainList.id} />
        )}
      </div>
    </div>
  );
}

export default App;
