const initialState = {
  layoutState: {
    ptexts: {
      "ptext-1": { id: "ptext-1", content: "content..." },
      "ptext-2": { id: "ptext-2", content: "content..." },
      "ptext-3": { id: "ptext-3", content: "content..." },
      "ptext-4": { id: "ptext-4", content: "content..." },
      "ptext-5": { id: "ptext-5", content: "content..." },
      "ptext-6": { id: "ptext-6", content: "content..." },
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "...",
        ptextIds: ["ptext-1", "ptext-2"],
      },
      "column-2": {
        id: "column-2",
        title: "...",
        ptextIds: ["ptext-3", "ptext-4"],
      },
      "column-3": {
        id: "column-3",
        title: "...",
        ptextIds: ["ptext-5", "ptext-6"],
      },
    },
    columnOrder: ["column-1", "column-2", "column-3"],
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
