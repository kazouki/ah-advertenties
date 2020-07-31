import api from "../../api";

import { showMessageWithTimeout } from "../appState/actions";
import { initializeLayout } from "../editor/actions";
import { getUserCards } from "../user/actions";

export function createCard(cardProps) {
  return async function (dispatch, getState) {
    const columns = getState().editorSliceReducer.layoutState.columns;
    const columnKeys = Object.keys(columns);
    const ptextCounts = columnKeys.map((key) => {
      return { [key]: columns[key].ptextIds.length };
    });
    //determine max column #, and use as index constraints
    const columnNrs = columnKeys.map((key) => parseInt(key.split("-")[1]));

    // const minColumnIndex = Math.min.apply(null, columnNrs);
    const maxColumnIndex = Math.max.apply(null, columnNrs);

    // check if layout is full
    const isFull = ptextCounts
      .map((obj) => {
        return Object.values(obj)[0];
      })
      .every((el) => el >= 4);

    // determine if new column must be created
    function configureColumnIndexIfFull() {
      if (isFull) {
        return maxColumnIndex + 1;
      }
      const availableSpot = ptextCounts.filter((obj) => {
        return parseInt(Object.values(obj)) < 4;
      });
      const availableIndex = Object.keys(availableSpot[0])[0].split("-")[1];
      return parseInt(availableIndex);
    }

    let columnIndex = configureColumnIndexIfFull();
    if (columnIndex < 1) columnIndex = 1;

    try {
      const res = await api("cards", {
        method: "POST",
        data: {
          cardProps,
          userId: getState().user.id,
          columnIndex,
        },
        jwt: getState().user.token,
      });

      if (res) {
        dispatch({ type: "CREATE_CARD", payload: res.data });
        const cards = getState().cardsSliceReducer.cards.cards;

        // get cards belonging to user
        dispatch(getUserCards(getState().user.id));
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

// TODO  create updateCardColumnIndex   thunk  separate from main updateCard thunk
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
        dispatch({ type: "UPDATE_CARD", payload: res.data });
        const cards = getState().cardsSliceReducer.cards.cards;
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
  return async function (dispatch) {
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

export function fetchUserFavs() {
  return async function (dispatch, getState) {
    try {
      // console.log(
      //   "getState().user.id  in fetchUserFavs action",
      //   getState().user.id
      // );
      if (getState().user.token) {
        const res = await api(`favorites/user`, {
          method: "POST",
          data: { userId: getState().user.id },
        });
        if (res) dispatch({ type: "USER_FAVS", payload: res.data });
      }
      return;
    } catch (e) {
      console.log(e);
    }
  };
}

export function addFav(cardId) {
  return async function (dispatch, getState) {
    try {
      const res = await api(`favorites`, {
        method: "POST",
        data: { cardId, userId: getState().user.id },
        jwt: getState().user.token,
      });
      dispatch(fetchUserFavs());
      return res;
      // console.log("res  from addFav::", res);
    } catch (e) {
      console.log(e);
    }
  };
}

export function unFav(cardId) {
  console.log("unFav worked");
  return async function (dispatch, getState) {
    try {
      const res = await api(`favorites`, {
        method: "DELETE",
        data: { cardId, userId: getState().user.id },
        jwt: getState().user.token,
      });
      dispatch(fetchUserFavs());
      return res;
      // console.log("res  from addFav::", res);
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
      dispatch(getHighestBid(cardId));
      dispatch(fetchCardDetail(cardId));
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
