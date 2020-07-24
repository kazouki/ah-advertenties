const initialState = {};

export default function artworksSliceReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case "ARTWORKS":
      return { ...state, artworks: payload };
    case "ARTWORK_DETAIL":
      return { ...state, artworksDetail: payload };
    case "ADD_HEART":
      return { ...state, artworkId: payload };
    case "HIGHEST_BID":
      return { ...state, highestBid: payload };

    default:
      return state;
  }
}
