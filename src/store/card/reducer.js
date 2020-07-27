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

    case "CREATE_CARD":
      const createCards = state.cards.cards;
      createCards.push(payload);

      return { ...state, cards: { cards: createCards } };

    case "DELETE_CARD":
      const deleteCards = state.cards.cards;
      const filtered = deleteCards.filter(function (el) {
        return parseInt(el.id) !== parseInt(payload);
      });
      return { ...state, cards: { cards: filtered } };

    case "UPDATE_CARD":
      const deleteUpdateCards = state.cards.cards;
      const filteredUpdate = deleteUpdateCards.filter(function (el) {
        return parseInt(el.id) !== parseInt(payload.id);
      });

      filteredUpdate.push({
        ...payload,
      });

      return { ...state, cards: { cards: filteredUpdate } };

    default:
      return state;
  }
}
