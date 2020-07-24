const initialState = {};

export default function cardsSliceReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case "CARDS":
      return { ...state, cards: payload };
    case "CARD_DETAIL":
      return { ...state, cardsDetail: payload };
    case "ADD_HEART":
      return { ...state, cardId: payload };
    case "HIGHEST_BID":
      return { ...state, highestBid: payload };

    default:
      return state;
  }
}
