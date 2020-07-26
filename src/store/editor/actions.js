import { fetchCards } from "../card/actions";

const fields = {
  aangeboden: false,
  gevraagd: false,
  title: "  ",
  description: " ",
  name: " ",
  telephone: " ",
  email: " ",
  date: " ",
};

const initialState = {
  layoutState: {
    ptexts: {
      "ptext-1": { ...fields, id: "ptext-1" },
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "...",
        ptextIds: ["ptext-1", "ptext-2", "ptext-3"],
      },
    },
    columnOrder: ["column-1", "column-0"],
  },
};

export const setLayoutState = (newState) => ({
  type: "SET_LAYOUT_STATE",
  payload: newState,
});

export const initializeLayout = (cards) => {
  return async (dispatch, getState) => {
    // console.log("getState fomr init", getState().cardsSliceReducer);

    // console.log(cards);

    let newPtexts = {};
    cards.forEach((card) => {
      newPtexts[`ptext-${card.id}`] = {
        id: `ptext-${card.id}`,
        aangeboden: card.aangeboden,
        gevraagd: card.gevraagd,
        title: card.title,
        description: card.description,
        name: card.name,
        telephone: card.telephone,
        email: card.email,
        date: card.date,
        cardId: card.id,
        columnIndex: card.columnIndex,
      };
    });
    // console.log("newPtexts", newPtexts);

    let newPtextIds = {};
    cards.forEach((card) => {
      newPtextIds[`column-${card.columnIndex}`] = cards
        .filter((ptext) => {
          return ptext.columnIndex === card.columnIndex;
        })
        .map((e) => `ptext-${e.id}`);
    });
    // console.log("newPtextIds", newPtextIds);

    let newColumns = {};
    console.log("keys of newPtexts ::: ", Object.keys(newPtexts));
    Object.keys(newPtexts).forEach((ptext) => {
      newColumns[`column-${newPtexts[ptext].columnIndex}`] = {
        id: `column-${newPtexts[ptext].columnIndex}`,
        title: "...",
        ptextIds: newPtextIds[`column-${newPtexts[ptext].columnIndex}`],
      };
    });
    console.log("newcolumns :: ", newColumns);

    let newColumnOrder = ["column-1", "column-2", "column-3"];

    console.log(newPtexts);

    const newState = {
      ...initialState.layoutState,
      ptexts: {
        ...newPtexts,
        // "ptext-1": { ...fields, title: cards[0].title, id: "ptext-1" },
      },
      columns: {
        ...newColumns,
      },
      columnOrder: [...newColumnOrder],
    };

    console.log("newState ::: ", newState);

    // console.log("initialState in initializeLayout (in thunk)", initialState);
    dispatch(setLayoutState(newState));
  };
};

export const setContentDescription = (description) => ({
  type: "SET_CONTENT_DESCRIPTION",
  payload: description,
});

export const addNewColumn = () => {
  console.log("addcolum reached");
  return (dispatch, getState) => {
    const layoutState = getState().editorSliceReducer.layoutState;

    const columns = layoutState.columns;
    const nrOfColumns = Object.keys(columns).length;

    const newColumnOrder = layoutState.columnOrder;
    newColumnOrder.push(`column-${nrOfColumns + 1}`);

    const newState = {
      ...layoutState,
      columns: {
        ...columns,
        [`column-${nrOfColumns + 1}`]: {
          id: `column-${nrOfColumns + 1}`,
          title: "Title",
          ptextIds: [],
        },
      },
      columnOrder: newColumnOrder,
    };
    dispatch(setLayoutState(newState));
  };
};
