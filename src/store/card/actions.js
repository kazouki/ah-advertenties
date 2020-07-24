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

export function fetchCards() {
  return async function thunk(dispatch, getState) {
    try {
      const res = await api("cards", { method: "GET" });
      if (res) {
        dispatch({ type: "CARDS", payload: res.data });
      } else return null;
    } catch (e) {
      console.log(e);
    }
  };
}

export function fetchCardDetail(id) {
  return async function thunk(dispatch, getState) {
    try {
      const res = await api(`cards/${id}`, { method: "GET" });
      if (res) {
        dispatch({ type: "CARD_DETAIL", payload: res.data.cardDetail });
        return true;
      } else return false;
    } catch (e) {
      console.log(e);
    }
  };
}

export function addHeart(cardId) {
  return async function (dispatch, getState) {
    try {
      const res = await api(`cards`, {
        method: "PATCH",
        data: { cardId },
        jwt: "",
      });
      dispatch({ type: "CARD_DETAIL", payload: res.data });

      try {
        const res = await api("cards", { method: "GET" });
        if (res) {
          dispatch({ type: "CARDS", payload: res.data });
        } else return null;
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function postBid({ cardId, amount, email, token, highestBid }) {
  return async function (dispatch, getState) {
    try {
      const res = await api("cards/bid", {
        method: "POST",
        data: { cardId, amount, email },
        jwt: token,
      });

      try {
        const res = await api(`cards/highestbid/${cardId}`);
        dispatch({ type: "HIGHEST_BID", payload: res.data });

        try {
          const res = await api(`cards/${cardId}`, { method: "GET" });
          if (res) {
            dispatch({
              type: "CARD_DETAIL",
              payload: res.data.cardDetail,
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

export function getHighestBid(cardId) {
  return async function (dispatch, getState) {
    try {
      const res = await api(`cards/highestbid/${cardId}`);
      dispatch({ type: "HIGHEST_BID", payload: res.data });
    } catch (e) {
      console.log(e);
    }
  };
}
