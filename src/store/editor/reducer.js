const fields = {
  aangeboden: false,
  gevraagd: false,
  title: " ",
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
        ptextIds: ["ptext-1"],
      },
    },
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
