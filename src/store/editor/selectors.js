export const selectLayoutState = (state) => {
  return state.editorSliceReducer.layoutState;
};

export const selectContentDescription = (state) => {
  return state.editorSliceReducer.contentDescription;
};
