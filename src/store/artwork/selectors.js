export const selectArtworks = (state) => {
  return state.artworksSliceReducer.artworks;
};

export const selectArtworkDetail = (state) => {
  return state.artworksSliceReducer.artworksDetail;
};

export const selectHighestBid = (state) => {
  return state.artworksSliceReducer.highestBid;
};
