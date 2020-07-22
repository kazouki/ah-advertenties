export const setLayoutState = (newState) => ({
  type: "SET_LAYOUT_STATE",
  payload: newState,
});

export const setContentDescription = (description) => ({
  type: "SET_CONTENT_DESCRIPTION",
  payload: description,
});

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
