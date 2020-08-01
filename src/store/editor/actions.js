// import { updateCard } from "../card/actions";

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
  return (dispatch, getState) => {
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
        cardId: card.cardId,
        columnIndex: card.columnIndex,
      };
    });

    let newPtextIds = {};
    cards.forEach((card) => {
      newPtextIds[`column-${card.columnIndex}`] = cards
        .filter((ptext) => {
          return ptext.columnIndex === card.columnIndex;
        })
        .map((e) => `ptext-${e.id}`);
    });

    let newColumns = {};
    Object.keys(newPtexts).forEach((ptext) => {
      newColumns[`column-${newPtexts[ptext].columnIndex}`] = {
        id: `column-${newPtexts[ptext].columnIndex}`,
        title: `column-${newPtexts[ptext].columnIndex}`,
        ptextIds: newPtextIds[`column-${newPtexts[ptext].columnIndex}`],
      };
    });

    const newColumnsPtextIdsXYArr = Object.keys(newColumns).map((e) => {
      return { [newColumns[e].id.split("-")[1]]: newColumns[e].ptextIds };
    });
    let ptextIdsPerColumn = {};
    newColumnsPtextIdsXYArr.forEach((e) => {
      const key = Object.keys(e)[0];
      const val = Object.values(e)[0];
      ptextIdsPerColumn[`column-${key}`] = val.length;
    });
    dispatch({
      type: "PTEXTIDS_PER_COLUMN",
      payload: { ...ptextIdsPerColumn },
    });

    // console.log("newcolumns ", newColumns);

    /////// ???????
    let newColumnsOrdered = {};
    Object.keys(newColumns)
      .map((key) => parseInt(key.split("-")[1]))
      .sort((a, b) => a - b)
      .map((e) => `column-${e}`)
      .forEach((key) => {
        newColumnsOrdered[key] = newColumns[key];
      });

    const newColumnOrder = Object.keys(newColumnsOrdered);

    const newState = {
      ...initialState.layoutState,
      ptexts: {
        ...newPtexts,
      },
      columns: {
        ...newColumnsOrdered,
      },
      columnOrder: [...newColumnOrder],
    };
    dispatch(setLayoutState(newState));
  };
};

export const setContentDescription = (description) => ({
  type: "SET_CONTENT_DESCRIPTION",
  payload: description,
});
/////

///// temp
export const addNewColumn = () => {
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
