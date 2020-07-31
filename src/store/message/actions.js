import api from "../../api";

export function fetchMessages({ cardOwnerId }) {
  return async function (dispatch, getState) {
    try {
      const res = await api(`messages/all`, {
        method: "POST",
        data: { cardOwnerId, userId: getState().user.id },
        jwt: getState().user.token,
      });
      if (res) {
        dispatch({ type: "LOAD_MESSAGES", payload: res.data });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function postMessage({ toUserId, text }) {
  return async function (dispatch, getState) {
    try {
      const res = await api(`messages`, {
        method: "POST",
        data: {
          toUserId,
          text,
          fromUserId: getState().user.id,
        },
        jwt: getState().user.token,
      });
      dispatch(fetchMessages({ cardOwnerId: toUserId }));
      return res;
    } catch (e) {
      console.log(e);
    }
  };
}
