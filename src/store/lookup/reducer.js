const initialState = {};

export default function lookupSliceReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case "NLP_RESPONSE":
      return { ...state, sentences: payload };

    default:
      return state;
  }
}
