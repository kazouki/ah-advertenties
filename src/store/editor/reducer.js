const fields = {
  aangeboden: " ",
  gevraagd: " ",
  title: " ",
  description: " ",
  name: " ",
  telephone: " ",
  email: " ",
  datum: " ",
};

const initialState = {
  layoutState: {
    ptexts: {
      "ptext-1": { ...fields, id: "ptext-1" },
      "ptext-2": { ...fields, id: "ptext-2" },
      "ptext-3": { ...fields, id: "ptext-3" },
      "ptext-4": { ...fields, id: "ptext-4" },
      "ptext-5": { ...fields, id: "ptext-5" },
      "ptext-6": { ...fields, id: "ptext-6" },
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
