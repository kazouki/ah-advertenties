const initialState = {
  layoutState: {
    ptexts: {
      "ptext-1": { id: "ptext-1", content: "content..." },
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "Title",
        ptextIds: ["ptext-1"],
      },
    },
    //for reordering columns later on
    columnOrder: ["column-1"],
  },
};
export default function editorSliceReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case "SET_LAYOUT_STATE":
      return { ...state, layoutState: payload };
    case "SET_CONTENT_DESCRIPTION":
      return { ...state, contentDescription: payload };

    default:
      return state;
  }
}
