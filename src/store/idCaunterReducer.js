let defoultState = {
  id_lists: 0,
  id_notes: 0,
};

// принимаем данные из localStorage
const date = JSON.parse(localStorage.getItem("caunter"));
if (date != null) {
  defoultState = date;
}

const ID_LISTS = "ID_LISTS";
const ID_NOTES = "ID_NOTES";

export const idCaunterReducer = (state = defoultState, action) => {
  switch (action.type) {
    case ID_LISTS:
      // записываем в localStorage
      localStorage.setItem(
        "caunter",
        JSON.stringify({ ...state, id_lists: state.id_lists + 1 })
      );
      return { ...state, id_lists: state.id_lists + 1 };

    case ID_NOTES:
      // записываем в localStorage
      localStorage.setItem(
        "caunter",
        JSON.stringify({ ...state, id_notes: state.id_notes + 1 })
      );
      return { ...state, id_notes: state.id_notes + 1 };

    default:
      return state;
  }
};

export const idListsIncre = (item) => ({ type: ID_LISTS, item });
export const idNotesIncre = (item) => ({ type: ID_NOTES, item });
