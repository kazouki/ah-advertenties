import api from "../../api";

import { showMessageWithTimeout } from "../appState/actions";
import { initializeLayout } from "../editor/actions";

export function createCard() {
  return async function (dispatch, getState) {
    const columns = getState().editorSliceReducer.layoutState.columns;
    console.log("columns in createCard", columns);

    const columnKeys = Object.keys(columns);
    console.log("columnKeys in createCard", columnKeys);

    const ptextCounts = columnKeys.map((key) => {
      return { [key]: columns[key].ptextIds.length };
    });
    console.log("ptextCounts in createCard", ptextCounts);

    //TODO create min column # / max colum #, and use as index in find method
    const columnNrs = columnKeys.map((key) => parseInt(key.split("-")[1]));
    const minColumIndex = Math.min.apply(null, columnNrs);
    const maxColumIndex = Math.max.apply(null, columnNrs);
    console.log("minColumIndex in createCard", minColumIndex);
    console.log("maxColumIndex in createCard", maxColumIndex);

    //TODO check if column-# exists

    const columnIndex = parseInt(
      Object.keys(
        ptextCounts.find((obj, i) => {
          return obj[`column-${i + minColumIndex}`] < 3;
        })
      )[0].split("-")[1]
    );
    console.log("columnIndex in createCard", columnIndex);

    try {
      const res = await api("cards", {
        method: "POST",
        data: {
          userId: getState().user.id,
          columnIndex,
        },
        jwt: getState().user.token,
      });

      if (res) {
        dispatch({ type: "CREATE_CARD", payload: res.data });
        const cards = getState().cardsSliceReducer.cards.cards;
        dispatch(initializeLayout(cards));
        dispatch(
          showMessageWithTimeout(
            "success",
            true,
            "Je hebt een nieuwe kaart gemaakt!"
          )
        );
        return;
      } else return;
    } catch (e) {
      console.log(e);
    }
  };
}

export function deleteCard(cardId) {
  return async function (dispatch, getState) {
    try {
      const res = await api(`cards`, {
        method: "DELETE",
        data: {
          cardId,
        },
        jwt: getState().user.token,
      });
      if (res) {
        dispatch({ type: "DELETE_CARD", payload: cardId });
        const cards = getState().cardsSliceReducer.cards.cards;
        dispatch(initializeLayout(cards));

        dispatch(
          showMessageWithTimeout("success", true, "Je kaart is verwijderd!")
        );
        return res;
      } else return null;
    } catch (e) {
      console.log(e);
    }
  };
}
export function updateCard(cardProps) {
  const {
    aangeboden,
    gevraagd,
    title,
    description,
    name,
    telephone,
    email,
    date,
    columnIndex,
    cardId,
  } = cardProps;
  console.log("cardProps in updateCard", cardProps);
  return async function (dispatch, getState) {
    try {
      const res = await api(`cards`, {
        method: "PUT",
        data: {
          aangeboden,
          gevraagd,
          title,
          description,
          name,
          telephone,
          email,
          date,
          userId: getState().user.id,
          columnIndex,
          cardId,
        },
        jwt: getState().user.token,
      });
      if (res) {
        dispatch({ type: "UPDATE_CARD", payload: cardProps });
        const cards = getState().cardsSliceReducer.cards.cards;
        console.log("cards in updateCard", cards);
        dispatch(initializeLayout(cards));

        dispatch(
          showMessageWithTimeout("success", true, "Je kaart is opgeslagen!")
        );
        return res;
      } else return null;
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
        const cards = getState().cardsSliceReducer.cards.cards;
        dispatch(initializeLayout(cards));
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
