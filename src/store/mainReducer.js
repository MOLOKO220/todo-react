let defoultState = {
  lists: [],
};

// принимаем данные из localStorage
const date = JSON.parse(localStorage.getItem("store"));
if (date != null) {
  defoultState = date;
}

const ADD_NEW_LIST = "ADD_NEW_LIST";
const ADD_NOTE = "ADD_NOTE";
const EDIT_NOTE = "EDIT_NOTE";
const REMOVE_LIST = "REMOVE_LIST";
const REMOVE_NOTE = "REMUV_NOTE";

export const mainReducer = (state = defoultState, action) => {
  switch (action.type) {
    case ADD_NEW_LIST:
      // записываем в localStorage
      localStorage.setItem(
        "store",
        JSON.stringify({ lists: [...state.lists, ...action.list] })
      );
      return { lists: [...state.lists, ...action.list] };

    case ADD_NOTE:
      state.lists.forEach((e) => {
        // перебираем state сравниваем id, что бы достучатся до нужного list
        if (e.id == action.list[0]) {
          e.notes.push(action.list[1]);
          // обращаемся к state, push в конкретные "notes" новую запись, и после этого возвращаем новый state
        }
      });

      // записываем в localStorage
      localStorage.setItem("store", JSON.stringify({ ...state }));
      return { ...state };

    case EDIT_NOTE:
      state.lists.forEach((i) => {
        if (i.id == action.list[0]) {
          i.notes.forEach((e) => {
            if (e.id_notes == action.list[1]) {
              e.content = action.list[2];
              // выбираем конкретный List в нём выбираем конкретный note и изменяем его
            }
          });
        }
      });
      // записываем в localStorage
      localStorage.setItem("store", JSON.stringify({ ...state }));
      return { ...state };

    case REMOVE_LIST:
      // удаляем конкретный list
      let newLists = null;
      state.lists.forEach((i) => {
        if (i.id == action.list) {
          newLists = state.lists.filter((e) => {
            return e != i;
          });
        }
      });
      // записываем в localStorage
      localStorage.setItem("store", JSON.stringify({ lists: [...newLists] }));
      return { lists: [...newLists] };

    case REMOVE_NOTE:
      // удаляем конкретную note
      state.lists.forEach((e) => {
        if (e.id == action.list[0]) {
          e.notes.forEach((i) => {
            if (i.id_notes == action.list[1]) {
              e.notes = e.notes.filter((item) => {
                return item != i;
              });
            }
          });
        }
      });
      // записываем в localStorage
      localStorage.setItem(
        "store",
        JSON.stringify({ lists: [...state.lists] })
      );
      return { lists: [...state.lists] };

    default:
      return state;
  }
};

export const chengNote = (list) => ({ type: EDIT_NOTE, list });
export const addNewItem = (list) => ({ type: ADD_NEW_LIST, list });
export const addNewNote = (list) => ({ type: ADD_NOTE, list });
export const removeListReducer = (list) => ({ type: REMOVE_LIST, list });
export const removeNote = (list) => ({ type: REMOVE_NOTE, list });
