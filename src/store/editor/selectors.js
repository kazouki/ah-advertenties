export const selectLayoutState = (state) => {
  return state.editorSliceReducer.layoutState;
};
export const selectPtextIdsPerColumn = (state) => {
  return state.editorSliceReducer.ptextIdsPerColumn;
};

export const selectContentDescription = (state) => {
  return state.editorSliceReducer.contentDescription;
};
