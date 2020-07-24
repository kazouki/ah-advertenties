import api from "../../api";

import { showMessageWithTimeout } from "../appState/actions";

export function createCard({
  aangeboden,
  gevraagd,
  title,
  description,
  name,
  telephone,
  email,
  date,
  userId,
  imageUrl,
  minimumBid,
  token,
}) {
  return async function (dispatch) {
    try {
      const res = await api("cards", {
        method: "POST",
        data: {
          aangeboden,
          gevraagd,
          title,
          description,
          name,
          telephone,
          email,
          date,
          userId,
          imageUrl,
          minimumBid,
          token,
        },
        jwt: token,
      });
      dispatch(showMessageWithTimeout("success", true, "auction created!"));
      return res;
    } catch (e) {
      console.log(e);
    }
  };
}

export function fetchArtworks() {
  return async function thunk(dispatch, getState) {
    try {
      const res = await api("artworks", { method: "GET" });
      if (res) {
        dispatch({ type: "ARTWORKS", payload: res.data });
      } else return null;
    } catch (e) {
      console.log(e);
    }
  };
}

export function fetchArtworkDetail(id) {
  return async function thunk(dispatch, getState) {
    try {
      const res = await api(`artworks/${id}`, { method: "GET" });
      if (res) {
        dispatch({ type: "ARTWORK_DETAIL", payload: res.data.artworkDetail });
        return true;
      } else return false;
    } catch (e) {
      console.log(e);
    }
  };
}

export function addHeart(artworkId) {
  return async function (dispatch, getState) {
    try {
      const res = await api(`artworks`, {
        method: "PATCH",
        data: { artworkId },
        jwt: "",
      });
      dispatch({ type: "ARTWORK_DETAIL", payload: res.data });

      try {
        const res = await api("artworks", { method: "GET" });
        if (res) {
          dispatch({ type: "ARTWORKS", payload: res.data });
        } else return null;
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function postBid({ artworkId, amount, email, token, highestBid }) {
  return async function (dispatch, getState) {
    try {
      const res = await api("artworks/bid", {
        method: "POST",
        data: { artworkId, amount, email },
        jwt: token,
      });

      try {
        const res = await api(`artworks/highestbid/${artworkId}`);
        dispatch({ type: "HIGHEST_BID", payload: res.data });

        try {
          const res = await api(`artworks/${artworkId}`, { method: "GET" });
          if (res) {
            dispatch({
              type: "ARTWORK_DETAIL",
              payload: res.data.artworkDetail,
            });
            return true;
          } else return false;
        } catch (e) {
          console.log(e);
        }
      } catch (e) {
        console.log(e);
      }

      return res;
    } catch (e) {
      console.log(e);
    }
  };
}

export function getHighestBid(artworkId) {
  return async function (dispatch, getState) {
    try {
      const res = await api(`artworks/highestbid/${artworkId}`);
      dispatch({ type: "HIGHEST_BID", payload: res.data });
    } catch (e) {
      console.log(e);
    }
  };
}
