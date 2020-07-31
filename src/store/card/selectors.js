export const selectCards = (state) => {
  return state.cardsSliceReducer.cards;
};

export const selectUserFavs = (state) => {
  return state.cardsSliceReducer.userFavs;
};

export const selectCardDetail = (state) => {
  return state.cardsSliceReducer.cardsDetail;
};

export const selectHighestBid = (state) => {
  return state.cardsSliceReducer.highestBid;
};
